import { useEffect, useRef, useState } from 'react';

interface Reading { id: string; incubatorId: string; temperature: number; humidity: number; source: string; createdAt: string }
interface Result { items: Reading[]; total: number; until: string }
const label = (id: string) => id.replace(/^incubadora-(\d+)$/, 'Incubadora #$1');
const date = (value: string) => new Date(value).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' });
const alarm = (t: number) => t < 25 ? 'Temperatura baja' : t > 40 ? 'Temperatura alta' : 'Dentro del rango 25–40 °C';

export function History({ ids }: { ids: string[] }) {
  const [id, setId] = useState(ids[0] ?? 'incubadora-1');
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<Result>({ items: [], total: 0, until: '' });
  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const snapshotUntil = useRef<string>();

  function url(p: number, limit: number, frozenUntil?: string) {
    const query = new URLSearchParams({ page: String(p), limit: String(limit) });
    // datetime-local se interpreta en la zona horaria del navegador.
    if (since) query.set('since', new Date(since).toISOString());
    if (frozenUntil || until) query.set('until', frozenUntil || new Date(until).toISOString());
    return `/api/incubators/${encodeURIComponent(id)}/records?${query}`;
  }
  useEffect(() => {
    const abort = new AbortController();
    let active = true;
    async function load() {
      setBusy(true);
      try {
        const response = await fetch(url(page, 25, page > 1 ? snapshotUntil.current : undefined), { signal: abort.signal });
        if (!response.ok) throw new Error('No se pudo consultar el historial. Revisa las fechas y el backend.');
        const data: Result = await response.json();
        if (active) { snapshotUntil.current = data.until; setResult(data); setError(''); }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : 'Error de conexión');
      } finally { if (active) setBusy(false); }
    }
    void load();
    const timer = page === 1 ? window.setInterval(() => void load(), 10000) : undefined;
    return () => { active = false; abort.abort(); window.clearInterval(timer); };
  }, [id, since, until, page, refresh]);

  async function download() {
    setExporting(true);
    setError('');
    try {
      let all: Reading[] = [];
      let frozenUntil = until ? new Date(until).toISOString() : undefined;
      for (let p = 1; ; p++) {
        const response = await fetch(url(p, 1000, frozenUntil));
        if (!response.ok) throw new Error('No se pudo descargar el historial completo. Intenta de nuevo.');
        const batch: Result = await response.json();
        frozenUntil = batch.until;
        all = all.concat(batch.items);
        if (all.length >= batch.total) break;
        if (batch.items.length === 0) throw new Error('El historial cambió durante la descarga. Vuelve a intentarlo.');
      }
      if (!all.length) throw new Error('No hay mediciones para descargar en este período.');
      const cell = (value: unknown) => {
        let text = String(value);
        if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
        return '"' + text.replace(/"/g, '""') + '"';
      };
      const rows: unknown[][] = [['Incubadora', 'Fecha y hora (Costa Rica, UTC-6)', 'Fecha UTC', 'Temperatura (°C)', 'Humedad (%)', 'Alarma térmica calculada', 'Origen']];
      all.reverse().forEach(r => rows.push([label(r.incubatorId), date(r.createdAt), r.createdAt,
        r.temperature, r.humidity, alarm(r.temperature), r.source === 'esp32' ? 'ESP32 física' : 'Simulador']));
      const blob = new Blob(['\uFEFFsep=;\r\n' + rows.map(row => row.map(cell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8;' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href; link.download = `historial-${id}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(href), 1000);
    } catch (e) { setError(e instanceof Error ? e.message : 'Error al exportar'); }
    finally { setExporting(false); }
  }

  return <section className="history-panel" aria-labelledby="history-title">
    <h2 id="history-title">Historial de mediciones</h2>
    <p>Se guarda cada medición recibida, incluso si el valor no cambia. Las fechas de la tabla se muestran en hora de Costa Rica (UTC−6).</p>
    <div className="history-tools">
      <label>Incubadora<select value={id} onChange={e => { setId(e.target.value); setPage(1); }} disabled={exporting}>
        {ids.map(value => <option key={value} value={value}>{label(value)}</option>)}
      </select></label>
      <label>Desde (hora de este equipo)<input type="datetime-local" value={since} disabled={exporting} onChange={e => { setSince(e.target.value); setPage(1); }} /></label>
      <label>Hasta (hora de este equipo)<input type="datetime-local" value={until} disabled={exporting} onChange={e => { setUntil(e.target.value); setPage(1); }} /></label>
      <button onClick={() => setRefresh(x => x + 1)} disabled={busy || exporting}>Actualizar</button>
      <button onClick={() => void download()} disabled={exporting || busy}>{exporting ? 'Preparando archivo…' : 'Descargar CSV para Excel'}</button>
    </div>
    <p>El archivo incluye todas las mediciones del período elegido, no solo esta página. Sin fechas, descarga todo el historial de la incubadora.</p>
    {error && <p role="alert" className="history-error">{error}</p>}
    <p aria-live="polite">{busy ? 'Consultando…' : `${result.total} mediciones guardadas`}</p>
    <div className="history-scroll"><table>
      <thead><tr><th>Fecha y hora</th><th>Temperatura</th><th>Humedad</th><th>Alarma térmica calculada</th><th>Origen</th></tr></thead>
      <tbody>{!error && result.items.map(r => <tr key={r.id}><td>{date(r.createdAt)}</td><td>{r.temperature.toFixed(1)} °C</td><td>{r.humidity.toFixed(0)} %</td><td>{alarm(r.temperature)}</td><td>{r.source === 'esp32' ? 'ESP32 física' : 'Simulada'}</td></tr>)}</tbody>
    </table></div>
    {!busy && !error && result.total === 0 && <p>No hay mediciones en este período.</p>}
    <div className="history-pages">
      <button disabled={page <= 1 || busy || exporting} onClick={() => setPage(x => x - 1)}>Anterior</button>
      <span>Página {page} de {Math.max(1, Math.ceil(result.total / 25))}</span>
      <button disabled={page * 25 >= result.total || busy || exporting} onClick={() => setPage(x => x + 1)}>Siguiente</button>
    </div>
    <p>La alarma térmica se calcula con los límites del prototipo (&lt;25 °C o &gt;40 °C). No confirma el estado eléctrico del LED o buzzer. Solo se registran datos mientras la placa puede comunicarse con el servidor.</p>
  </section>;
}
