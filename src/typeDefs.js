module.exports  = `
    scalar Upload

    type Tech{
        id: ID!,
        name: String!,
        logo: String!,
    }

    type Query{
        sayHi: String
    }
    
    type Mutation {
        uploadFile (file: Upload!): Boolean
    }
`;