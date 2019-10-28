import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ValidationError from '../../services/error';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Error } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '', // Will take care of our new repos being added to vector repositories
    repositories: [], // Initializing as an empty array
    loading: false,
    error: false,
    errorMessage: '',
  };

  /**
   * Load the data from localStorage
   */
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  /**
   * Save the data to localStorage
   */
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  /**
   * Setting the state with the value of the event (e) target
   */
  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
      error: false,
      errorMessage: '',
    });
  };

  /**
   * As we are expecting a response from an API, we gotta add an attr 'async' before
   * the event, this way we can have that working
   */
  handleSubmit = async e => {
    e.preventDefault();

    // Setting the state loading to true
    this.setState({ loading: true });

    try {
      // Getting newRepo destructurated from the state
      const { newRepo, repositories } = this.state;
      // Awaiting the response from api then saving it under 'response' const
      const response = await api.get(`/repos/${newRepo}`).catch(function(err) {
        if (err.response.status === 404)
          throw new ValidationError(
            'O repositório com esse nome não foi encontrado no Github!'
          );
      });

      // Check if repository name isn't empty
      if (newRepo === '')
        throw new ValidationError('O repositório precisa de um nome!');

      // Check if the repository name isnt duplicated
      const repoExists = repositories.find(
        r => r.name === response.data.full_name
      );

      // If repository already exists, then throw error
      if (repoExists)
        throw new ValidationError('Um repositório com esse nome já existe!');

      /* Only getting name as a data atm, but can get more in the future, so why not
    a destructuration */
      const data = {
        name: response.data.full_name,
      };

      /* Creating a new vector based on ...repositories old data and
    putting 'data' as new repo info */
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, error, errorMessage } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        {error ? (
          <Error>
            <p>{errorMessage}</p>
          </Error>
        ) : (
          <></>
        )}
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

/*
<Title error={false}>
      Main
      <small>menor</small>
    </Title>
*/
