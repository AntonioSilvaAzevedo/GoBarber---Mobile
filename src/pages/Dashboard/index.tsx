import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProviderList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { singOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateProfile = useCallback(() => {
    // navigate('Profile');
    singOut();
  }, [singOut]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateProfile}>
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>

      <ProviderList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <UserName>{item.name}</UserName>}
      />
    </Container>
  );
};

export default Dashboard;
