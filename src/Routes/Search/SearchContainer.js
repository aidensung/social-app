import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchPresenter from './SearchPresenter';
import { useQuery } from '@apollo/client';
import { SEARCH } from './SearchQueries';

const SearchContainer = ({ location: { search } }) => {
  const term = search.split('=')[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: { term },
  });
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
};

SearchContainer.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default withRouter(SearchContainer);
