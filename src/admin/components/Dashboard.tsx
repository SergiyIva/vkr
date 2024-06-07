import React from 'react';
import { Box, Button, H2, H5, Illustration, IllustrationProps, Text, } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import { TranslateFunction, useTranslation } from 'adminjs';

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader: React.FC = () => {
  const { translateMessage } = useTranslation();
  return (
    <Box position="relative" overflow="hidden" data-css="default-dashboard">
      <Box
        position="absolute"
        top={50}
        left={-10}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Rocket" />
      </Box>
      <Box
        position="absolute"
        top={-70}
        right={-15}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Moon" />
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>{translateMessage('welcomeOnBoard_title')}</H2>
          <Text opacity={0.8}>
            {translateMessage('welcomeOnBoard_subtitle')}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

type BoxType = {
  variant: string;
  title: string;
  subtitle: string;
  href: string;
};

const boxes = ({
                 translateMessage,
               }: {
  translateMessage: TranslateFunction;
}): Array<BoxType> => [
  {
    variant: 'Planet',
    title: translateMessage('addingResources_title'),
    subtitle: translateMessage('addingResources_subtitle'),
    href: '/admin/resources/Developer',
  },
  {
    variant: 'DocumentCheck',
    title: translateMessage('customizeResources_title'),
    subtitle: translateMessage('customizeResources_subtitle'),
    href: 'admin/resources/Order',
  },
  {
    variant: 'Astronaut',
    title: translateMessage('roleBasedAccess_title'),
    subtitle: translateMessage('roleBasedAccess_subtitle'),
    href: 'admin/resources/Administrator',
  },
];

const Card = styled(Box)`
    display: ${({ flex }: any): string => (flex ? 'flex' : 'block')};
    color: ${({ theme }: any) => theme.colors.grey100};
    height: 100%;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: ${({ theme }: any) => theme.space.md};
    transition: all 0.1s ease-in;

    &:hover {
        border: 1px solid ${({ theme }: any) => theme.colors.primary100};
        box-shadow: ${({ theme }: any) => theme.shadows.cardHover};
    }
`;

Card.defaultProps = {
  variant: 'container',
  boxShadow: 'card',
};

export const Dashboard: React.FC = () => {
  const { translateMessage, translateButton } = useTranslation();

  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes({ translateMessage }).map((box, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Card as="a" href={box.href}>
              <Text textAlign="center">
                <Illustration
                  variant={box.variant as IllustrationProps['variant']}
                  width={100}
                  height={70}
                />
                <H5 mt="lg">{box.title}</H5>
                <Text>{box.subtitle}</Text>
              </Text>
            </Card>
          </Box>
        ))}
        <Card width={1} m="lg">
          <Text textAlign="center">
            <Illustration variant="SlackLogo" />
            <H5>{translateMessage('foundBug_title')}</H5>
            <Text>{translateMessage('foundBug_subtitle')}</Text>
            <Text mt="xxl">
              <Button
                as="a"
                variant="contained"
                href="https://t.me/SergiyIva"
                target="_blank"
              >
                {translateButton('contactUs')}
              </Button>
            </Text>
          </Text>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
