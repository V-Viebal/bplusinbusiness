const ELEMENT_COLORS = {
  kim: ['#F3EEE4','#B9A984','#88967C','#3D413B'],
  moc: ['#F2EFE4','#88967C','#B8956E','#34483B'],
  thuy: ['#F0EEE8','#7891A0','#B9A984','#263A45'],
  hoa: ['#F8EFE6','#B56C4D','#B8956E','#5B3B35'],
  tho: ['#F4EFE6','#C4A47D','#88967C','#6F5844'],
  unknown: ['#F4EFE6','#B8956E','#88967C','#27221E'],
};
const roomLabel = { living:'phòng khách', bedroom:'phòng ngủ', dining:'phòng ăn', study:'phòng làm việc' };
function createFallback(data) {
  const vi = data.language !== 'EN';
  const palette = [...(ELEMENT_COLORS[data.element] || ELEMENT_COLORS.unknown)];
  const prefs = String(data.likes || '').toLowerCase();
  const avoid = String(data.avoid || '').toLowerCase();
  if (/xanh|green|sage|lá/.test(prefs)) palette[1] = '#88967C';
  if (/đất|cam|terracotta|ấm|warm/.test(prefs)) palette[2] = '#B56C4D';
  if (/xanh dương|blue|navy/.test(prefs)) palette[2] = '#7891A0';
  if (/hồng|pink/.test(prefs)) palette[2] = '#B88C87';
  if (/đen|black/.test(avoid) && palette[3] === '#27221E') palette[3] = '#6E6760';
  if (/đỏ|red/.test(avoid) && palette[2] === '#B56C4D') palette[2] = '#88967C';
  if (palette[2] === palette[1]) palette[2] = palette[3] === '#B8956E' ? '#C4A47D' : '#B8956E';
  const names = vi ? ['Nền Oat Milk','Gỗ & nội thất','Điểm nhấn','Chi tiết trầm'] : ['Oat milk base','Furniture tone','Accent','Deep detail'];
  const roles = vi ? ['60% nền','30% nội thất','10% nhấn','Bổ trợ'] : ['60% base','30% furniture','10% accent','Supporting'];
  return { source:'design-rules', title:vi?'Japandi dịu ấm cho không gian của bạn':'Warm Japandi for your space', summary:vi?`Gợi ý cho ${roomLabel[data.room] || 'ngôi nhà'} với ánh sáng ${data.light === 'dark' ? 'ít' : data.light === 'bright' ? 'nhiều' : 'vừa phải'} và sở thích: ${data.likes}.`:`A calming palette for your ${data.room}, shaped by your preferences: ${data.likes}.`, reasoning:vi?'Tông nền sáng giúp không gian dễ chịu, chất liệu gỗ mang độ ấm và điểm nhấn màu tạo chiều sâu. Điều chỉnh độ đậm theo lượng ánh sáng tự nhiên của phòng.':'A light base softens the room; timber adds warmth and an accent creates depth. Adjust saturation to natural light.', fengShuiNote:vi?data.element === 'unknown'?'Phong thủy là tham khảo văn hóa, không phải quy tắc bắt buộc. Năm sinh không tự xác định mệnh.':`Đã cân nhắc sở thích tham khảo ngũ hành ${data.element.toUpperCase()}, nhưng ưu tiên cảm nhận cá nhân và ánh sáng thực tế. Phong thủy không bảo đảm kết quả sức khỏe hay tài vận.`:'Feng shui is treated as an optional cultural preference, not a guarantee of outcomes.', swatches:palette.map((hex,i)=>({ name:names[i],hex,role:roles[i] })), usage:vi?['Dùng màu nền cho tường, trần và vải rèm.','Chọn tông nội thất cho gỗ, sofa và bàn.','Dùng màu nhấn ở gối, tranh, gốm hoặc một ghế đơn.']:['Apply the base to walls, ceilings and curtains.','Use the furniture tone for timber, sofa and tables.','Reserve the accent for cushions, art or ceramics.'] };
}
function validateAdvice(data) { return data && typeof data.title === 'string' && typeof data.summary === 'string' && typeof data.reasoning === 'string' && typeof data.fengShuiNote === 'string' && Array.isArray(data.swatches) && data.swatches.length === 4 && data.swatches.every(s=>/^#[0-9a-fA-F]{6}$/.test(s.hex) && typeof s.name==='string' && typeof s.role==='string') && Array.isArray(data.usage); }
export async function recommend(data) {
  const fallback = createFallback(data);
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY') return fallback;
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const client = new GoogleGenAI({ apiKey:key });
    const response = await client.models.generateContent({ model:process.env.GEMINI_MODEL || 'gemini-2.5-flash', contents:`Recommend a residential interior palette as a professional B+IN designer. User inputs: ${JSON.stringify(data)}. Reply in ${data.language==='EN'?'English':'Vietnamese'}. Treat age as a design preference, not a stereotype. Treat feng shui as optional cultural preference; do not infer elemental identity from birth year and never claim fortune, health or financial outcomes. Respect colors to avoid, room lighting and user taste. Return exactly four HEX colors in 60/30/10/supporting roles with concise practical rationale. Output JSON only: {"title":"...","summary":"...","reasoning":"...","fengShuiNote":"...","swatches":[{"name":"...","hex":"#FFFFFF","role":"60% nền"}],"usage":["..."]}.`, config:{ responseMimeType:'application/json', temperature:0.65 } });
    const parsed = JSON.parse(response.text || '{}');
    if (validateAdvice(parsed)) return { ...parsed, source:'ai' };
  } catch (error) { console.error('Color AI unavailable, using design guidance:', error instanceof Error ? error.message : 'unknown'); }
  return fallback;
}
