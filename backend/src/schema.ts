// backend/src/schema.ts
import gql from 'graphql-tag';

export const typeDefs = gql`
  # --- Data Models ---
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String       # As requested
    subjects: [String]! # As requested
    attendance: Float!  # As requested (percentage or days)
  }

  type PaginatedEmployees {
    nodes: [Employee]!
    totalCount: Int!
    hasNextPage: Boolean!
  }

  # --- Inputs ---
  input EmployeeFilter {
    nameContains: String
    minAttendance: Float
  }

  input SortOption {
    field: String! # e.g., "name", "attendance"
    direction: String # "ASC" or "DESC"
  }

  # --- Roles ---
  enum Role {
    ADMIN
    EMPLOYEE
  }

  # --- API Definition ---
  type Query {
    # List employees with pagination, filtering, and sorting
    getEmployees(
      page: Int = 1
      limit: Int = 10
      filter: EmployeeFilter
      sort: SortOption
    ): PaginatedEmployees!

    # Retrieve single employee
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    # Admin only (Mock auth for now)
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String]!
      attendance: Float!
    ): Employee!

    # Admin only
    updateEmployee(
      id: ID!
      name: String
      attendance: Float
    ): Employee!
  }
`;