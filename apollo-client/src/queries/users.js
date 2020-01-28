import gql from 'graphql-tag';

const USERS = gql`
  {
    users(first: 5, page: 1) {
      data {
        id
        name
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($post: String!) {
    createPost(post: $post) {
      id
      title
    }
  }
`;

const SUBSCRIBE_POST = gql`
  subscription PostCreated {
    postCreated {
      id
      title
    }
  }
`;

export {
  USERS,
  CREATE_POST,
  SUBSCRIBE_POST
};
