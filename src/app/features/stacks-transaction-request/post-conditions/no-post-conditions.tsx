import { Box, Circle, HStack, styled } from 'leather-styles/jsx';

import { LockIcon } from '@app/ui/components/icons/lock-icon';

export function NoPostConditions(): React.JSX.Element {
  return (
    <HStack alignItems="center" gap="space.04" p="space.04">
      <Circle bg="accent.component-background-hover" flexShrink={0}>
        <LockIcon />
      </Circle>
      <Box flexGrow={1}>
        <styled.span textStyle="body.02">
          No transfers (besides fees) will be made from your account or the transaction will abort.
        </styled.span>
      </Box>
    </HStack>
  );
}
