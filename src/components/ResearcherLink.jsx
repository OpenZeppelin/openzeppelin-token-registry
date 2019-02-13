import React from 'react'
import yn from 'yn'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { EnsName } from '~/components/EnsName'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import * as routes from '~/../config/routes'

export const ResearcherLink = function ({ address, shorten = false, className = 'has-hover-border' }) {
  let content = <EnsName address={address} shorten={shorten} />

  if (yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG)) {
    return (
      <Link to={formatRoute(routes.RESEARCHER, { address })} className={className}>
        {content}
      </Link>
    )
  } else {
    return (
      <EtherscanAddressLink address={address} className={className}>
        {content}
      </EtherscanAddressLink>
    )
  }
}
