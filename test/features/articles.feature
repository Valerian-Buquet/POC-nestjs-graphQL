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

    Scenario: Create Article
        Given url '/graphql'
        And query with body
            """
            mutation articleCreate {
            articleCreate(input: { title: "toto", description: "tata" }) {
            article {
            id
            title
            description
            }
            }
            }
            """
        When i post the graphql request
        Then i should have a response node 'articleCreate'

    Scenario: Update Article
        Given url '/graphql'
        And query with body
            """
            mutation articleUpdate {
            articleUpdate(id: "8be15f59-8f53-437f-92c6-3b84234187da" , input: { title: "Hello modifié", description: "Description modifié" }) {
            article {
            id
            title
            description
            }
            }
            }
            """
        When i post the graphql request
        Then i should have a response node 'articleUpdate'

    Scenario: Delete Article
        Given url '/graphql'
        And query with body
            """
            mutation articleDelete {
            articleDelete(id: "1ad10fd4-500d-44cd-9620-bc8184244947") {
            id
            }
            }
            """
        When i post the graphql request
        Then i should have a response node 'articleDelete'