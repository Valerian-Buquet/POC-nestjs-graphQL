Feature: Articles

    Scenario: Get Articles list
        Given url '/graphql'
        And query with body
            """
            query getAllArticles {
            getArticles(take: 3, skip: 0, sortBy: { title: ASC}) {
            totalCount
            nodes {
            id
            title
            description
            createdAt
            updatedAt
            }
            }
            }
            """
        When i post the graphql request
        Then i should have a response node 'getArticles'