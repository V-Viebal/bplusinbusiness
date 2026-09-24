const React = () => (globalThis as any).__BIN_REACT__ as typeof import('react');
import { Edit3, Eye, ImagePlus, RotateCcw, Save, X } from 'lucide-react';
import './site-edit-mode.css';
type Content = { text: Record<string, string>; images: Record<string, string>; hidden: string[] };
const empty: Content = { text: {}, images: {}, hidden: [] };
const keyFor = (element: Element, type: 'text' | 'image') => {
  const parts: string[] = [];
  for (let node: Element | null = element; node && node.id !== 'root'; node = node.parentElement) {
    const siblings = node.parentElement ? [...node.parentElement.children].filter(x => x.tagName === node!.tagName) : [];
    parts.unshift(node.tagName.toLowerCase() + ':' + siblings.indexOf(node));
  }
  return type + ':' + location.hash.split('/')[1] + ':' + parts.join('/');
};
export default function SiteEditMode({ enabled, language = 'VI' }: { enabled: boolean; language?: string }) {
  const vi = language !== 'EN';
  const [content, setContent] = React().useState<Content>(empty);
  const [editing, setEditing] = React().useState(false);
  const [selected, setSelected] = React().useState<{ key: string; type: 'text' | 'image'; value: string } | null>(null);
  const [draft, setDraft] = React().useState('');
  const [status, setStatus] = React().useState('');
  const file = React().useRef<HTMLInputElement>(null);
  const contentRef = React().useRef(content); contentRef.current = content;
  const apply = (root: ParentNode = document) => {
    const data = contentRef.current;
    root.querySelectorAll('#main-header span, #main-header button, #main-header a, #main-header img, main h1, main h2, main h3, main p, main span, main a, main button, main img, footer h2, footer h3, footer p, footer span, footer img').forEach(element => {
      if (element.closest('.site-editor, .rw-overlay, [role=dialog]')) return;
      const image = element.tagName === 'IMG';
      if (!image && (element.children.length || !(element.textContent || '').trim())) return;
      const key = keyFor(element, image ? 'image' : 'text');
      if (image) { const src = data.images[key]; if (src && (element as HTMLImageElement).src !== src) (element as HTMLImageElement).src = src; }
      else { const value = data.text[key]; if (value !== undefined && element.textContent !== value) element.textContent = value; }
      (element as HTMLElement).style.display = data.hidden.includes(key) ? 'none' : '';
      element.classList.toggle('site-edit-target', enabled && editing);
      if (enabled && editing) element.setAttribute('data-site-edit-key', key); else element.removeAttribute('data-site-edit-key');
    });
  };
  React().useEffect(() => { fetch('/api/content/site').then(r => r.json()).then(setContent).catch(() => {}); }, []);
  React().useEffect(() => { let timer: number; const observer = new MutationObserver(() => { window.clearTimeout(timer); timer = window.setTimeout(() => apply(), 80); }); observer.observe(document.getElementById('root')!, { childList: true, subtree: true }); apply(); return () => { observer.disconnect(); window.clearTimeout(timer); document.querySelectorAll('.site-edit-target').forEach(el => { el.classList.remove('site-edit-target'); el.removeAttribute('data-site-edit-key'); }); }; }, [content, editing]);
  React().useEffect(() => {
    if (!enabled || !editing) return;
    const click = (event: MouseEvent) => { const target = (event.target as Element).closest('[data-site-edit-key]'); if (!target) return; event.preventDefault(); event.stopPropagation(); const image = target.tagName === 'IMG'; const key = target.getAttribute('data-site-edit-key')!; const value = image ? (target as HTMLImageElement).src : target.textContent || ''; setSelected({ key, type: image ? 'image' : 'text', value }); setDraft(value); };
    document.addEventListener('click', click, true); return () => document.removeEventListener('click', click, true);
  }, [enabled, editing]);
  const update = (next: Content) => { setContent(next); setStatus(vi ? 'Có thay đổi chưa lưu' : 'Unsaved changes'); };
  const save = async () => { const res = await fetch('/api/admin/content/site', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) }); setStatus(res.ok ? (vi ? 'Đã lưu toàn bộ thay đổi' : 'Changes saved') : (vi ? 'Không thể lưu. Vui lòng đăng nhập lại.' : 'Could not save. Sign in again.')); };
  const change = () => { if (!selected) return; update({ ...content, [selected.type === 'image' ? 'images' : 'text']: { ...content[selected.type === 'image' ? 'images' : 'text'], [selected.key]: draft } }); setSelected(null); };
  const hide = () => { if (!selected) return; update({ ...content, hidden: [...new Set([...content.hidden, selected.key])] }); setSelected(null); };
  const restore = () => { if (!selected) return; const next = { ...content, text: { ...content.text }, images: { ...content.images }, hidden: content.hidden.filter(x => x !== selected.key) }; delete next.text[selected.key]; delete next.images[selected.key]; update(next); setSelected(null); };
  if (!enabled) return null;
  return <><div className="site-editor"><button onClick={() => { setEditing(!editing); setSelected(null); }}><Edit3 size={16} />{editing ? (vi ? 'Tắt chỉnh sửa' : 'Exit edit') : (vi ? 'Chỉnh sửa trang' : 'Edit page')}</button>{editing && <><button onClick={save}><Save size={16} />{vi ? 'Lưu tất cả' : 'Save all'}</button><span>{status || (vi ? 'Chọn chữ hoặc ảnh để sửa' : 'Select text or image to edit')}</span></>}</div>{selected && <div className="site-editor-dialog" role="dialog" aria-modal="true"><div><button className="site-editor-close" onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button><h2>{selected.type === 'image' ? (vi ? 'Thay ảnh' : 'Change image') : (vi ? 'Sửa nội dung' : 'Edit text')}</h2>{selected.type === 'image' && <><input ref={file} type="file" accept="image/*" hidden onChange={event => { const image = event.target.files?.[0]; if (!image) return; if (image.size > 500000) { setStatus(vi ? 'Ảnh cần nhỏ hơn 500 KB để lưu' : 'Image must be under 500 KB'); return; } const reader = new FileReader(); reader.onload = () => setDraft(String(reader.result)); reader.readAsDataURL(image); }} /><button onClick={() => file.current?.click()}><ImagePlus size={16} />{vi ? 'Chọn ảnh nhỏ' : 'Choose small image'}</button></>}{selected.type === 'text' ? <textarea value={draft} onChange={e => setDraft(e.target.value)} rows={5} /> : <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="https://..." />}<div className="site-editor-actions"><button onClick={restore}><RotateCcw size={15} />{vi ? 'Khôi phục' : 'Restore'}</button><button onClick={hide}><Eye size={15} />{vi ? 'Ẩn' : 'Hide'}</button><button className="primary" onClick={change}><Save size={15} />{vi ? 'Áp dụng' : 'Apply'}</button></div></div></div>}</>;
}
