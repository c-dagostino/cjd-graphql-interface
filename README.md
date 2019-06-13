# graphql-interface

## Adding things to graphql-interface
____

_for these examples we shall reference a product search_

When adding something to graphql-interface, it is important to add it in the proper format

1. Your team's query will be in `graphqlFD576CB9/teamNameHere/graphql-something-backend/feature.gql` 
2. Queries and Mutations should go in `graphqlFD576CB9/base.gql`.  This will be combined into the schema.graphql when the package is pushed. 
3. `original` is used for SQL Server(MSSQL)
4. `new` is used for MySQL(Serverless Aurora)

### Example Input
___
Notice the addition of comments by simply encasing text in `""`
* _current_ standards are all fields should be documented

```
input ProductSearchInput {
  id: String
  description: String
  packaging: String
  color: String
  manufacturer: String
  baseCurve: String
  product: String
  power: String
  add: String
  upc: String
  version: String
  type: TypeEnum
  powerSign: PowerSignEnum
  cylinder: String
  axis: String
  deprecationFlag: Boolean
  diameter: String
  "Modality is how long a contact lens can be worn before it is replaced. Daily, 2-week, monthly, and quarterly, etc."
  # Switching to an emum at a later time when the modality/origin_modality columns are resolved to standard values
  modality: String
}
```

### Example Ouput
---
```
type ProductResults {
  id: String
  description: String
  packaging: String
  manufacturer: String
  baseCurve: String
  product: String
  color: String
  power: String
  add: String
  upc: String
  version: String
  type: TypeEnum
  powerSign: PowerSignEnum
  cylinder: String
  axis: String
  deprecation_flag: Boolean
  diameter: String
  productHash: String
  modality: String
}
```

### Deprecations
____
Sometimes we create pretty vague names for a query, and sometimes it's time to fix them!  When you do need to deprecate, make sure you give a specific reason for why you are deprecating.  When deprecation is needed use the following format
```gql
type Query {
  products(query: ProductSearchInput): [ProductResults] @deprecated(reason: "Too Vague Of Name, use browseProducts")
}
```

### Example of a Query
___

As you can see, this is the exact same as the deprecated query; however, we are giving it a better naming convention.

```gql
type QUERY {
  browseProducts(query: ProductSearchInput): [ProductResults]
}
```

