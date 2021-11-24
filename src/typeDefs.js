module.exports  =`
    scalar Upload

    type Tech{
        id: ID!,
        name: String!,
        logo: String!,
        logo_dark_mode: String
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
        demo: String!
        stack: [Tech]
    }

    type Query{
        getTech(name: String!): Tech
        getProject(name: String!): Project
        getProjects: [Project]
        getNProjects(first: Int, next: Int): [Project]
    }

    input TechInput{
        name: String!
        logo: Upload!
        logo_dark_mode: Upload
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