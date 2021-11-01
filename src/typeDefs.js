module.exports  =`
    scalar Upload

    type Tech{
        id: ID!,
        name: String!,
        logo: String!,
    }

    type Project{
        id: ID!
        name: String!
        description: String!
        prevProject: String!
        nextProject: String!
        coverPagePicture: String!
        mainPicture: String!
        pictureName: String!
        gitRepo: String!
        demo: String
        stack: [Tech]
    }

    type Query{
        getTech(name: String!): Tech
        getProject(name: String!): Project
        getProjects: [Project]
    }

    input TechInput{
        name: String!
        logo: Upload!
    }

    input ProjectInput{
        name: String!
        description: String!
        prevProject: String!
        nextProject: String!
        coverPagePicture: Upload!
        mainPicture: Upload!
        pictureName: Upload!
        gitRepo: String!
        demo: String
        stack:[String]
    }
    
    type Mutation {
        loadTech(input: TechInput!): Tech
        loadProject(input: ProjectInput!): Project
    }
`;