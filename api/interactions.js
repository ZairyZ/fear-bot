import { verifyKey } from 'discord-interactions';

const PUBLIC_KEY = '3643467d8929f68cb56bc9bc1bd65198ff0467f4394aad1ec828df07664cde58'; // substitua pela sua chave pública do Discord

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = JSON.stringify(req.body);

  try {
    verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
  } catch (err) {
    return res.status(401).send('Assinatura inválida');
  }

  if (req.body.type === 1) {
    return res.status(200).json({ type: 1 }); // PING
  }

  if (req.body.type === 2) {
    return res.status(200).json({
      type: 4,
      data: { content: 'Fear está online e surtando com estilo.' }
    });
  }

  return res.status(400).send('Tipo desconhecido');
}
