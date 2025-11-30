import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $limit: Int, $filter: EmployeeFilter, $sort: SortOption) {
    getEmployees(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      nodes {
        id
        name
        age
        class
        subjects
        attendance
      }
      totalCount
      hasNextPage
    }
  }
`;