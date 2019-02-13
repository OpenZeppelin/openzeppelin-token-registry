import React from 'react'
import { CodeSnippet } from '~/components/CodeSnippet'
import { stringToSlug } from '~/utils/stringToSlug'

export const ZosCodeSnippet = function ({ action = 'link', packageName, id }) {
  const slug = stringToSlug(packageName)
  const zosInstallSnippet = `zos ${action} ${slug} ${id || ''}`

  return <CodeSnippet snippet={zosInstallSnippet} />
}
