export const WHATSAPP_BASE_URL = 'https://wa.me/'

export function getPreFilledMessage(petName: string) {
  const query = '?text='
  const message = `Hello, I would love to have more information about ${petName}.`
  const url = query + message.split(' ').join('%20')
  return url
}
