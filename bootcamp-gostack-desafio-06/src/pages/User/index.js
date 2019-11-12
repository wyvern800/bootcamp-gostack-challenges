import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { ActivityIndicator } from 'react-native';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingDiv,
  LoadingList,
  ViewRepoButton,
  RepoButtonText,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.loadRepositories);
  };

  loadMore = () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.loadRepositories(nextPage);
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (loading) return null;
    return (
      <LoadingList>
        <ActivityIndicator color="#7159c1" />
      </LoadingList>
    );
  };

  handleNavigate = async user => {
    const { navigation } = this.props;

    const repository = await api.get(`/users/${user.login}/starred`);

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <LoadingDiv>
            <ActivityIndicator color="#7159c1" size="large" />
          </LoadingDiv>
        ) : (
          <Stars
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore} // Função que carrega mais itens
            onRefresh={this.refreshList}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                  <ViewRepoButton onPress={() => this.handleNavigate(item)}>
                    <RepoButtonText>Ver repositório</RepoButtonText>
                  </ViewRepoButton>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
