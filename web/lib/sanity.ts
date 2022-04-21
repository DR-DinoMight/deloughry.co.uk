import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'airrvxef',
  dataset: 'production',
  token: '', // or leave blank to be anonymous user
  useCdn: true
})

export const clientForPreview = sanityClient({
  projectId: 'airrvxef',
  dataset: 'production',
  apiVersion: '2021-08-29',
  token: process.env.SANITY_READ_ONLY_PREVIEW_TOKEN,// or leave blank to be anonymous user
  useCdn: false
})
