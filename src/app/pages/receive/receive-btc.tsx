import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import get from 'lodash.get';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useClipboard } from '@app/common/hooks/use-copy-to-clipboard';
import { useBackgroundLocationRedirect } from '@app/routes/hooks/use-background-location-redirect';
import { useCurrentAccountIndex } from '@app/store/accounts/account';
import { useNativeSegwitAccountIndexAddressIndexZero } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';

import { ReceiveTokensLayout } from './components/receive-tokens.layout';

interface ReceiveBtcModalType {
  type?: 'btc' | 'btc-stamp';
}

export function ReceiveBtcModal({ type = 'btc' }: ReceiveBtcModalType) {
  useBackgroundLocationRedirect();
  const analytics = useAnalytics();
  const { state } = useLocation();

  const currentAccountIndex = useCurrentAccountIndex();
  const accountIndex = get(state, 'accountIndex', currentAccountIndex);

  const activeAccountBtcAddress = useNativeSegwitAccountIndexAddressIndexZero(accountIndex);
  const btcAddress = get(state, 'btcAddress', activeAccountBtcAddress);

  const { onCopy } = useClipboard(btcAddress);

  function copyToClipboard() {
    void analytics.track('copy_btc_address_to_clipboard');
    toast.success('Copied to clipboard!');
    onCopy();
  }

  return (
    <ReceiveTokensLayout
      address={btcAddress}
      onCopyAddressToClipboard={copyToClipboard}
      title={type === 'btc-stamp' ? 'BITCOIN STAMP' : 'BIT'}
    />
  );
}
