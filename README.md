# A Quick Start Blockchain Explorer uisng Alchemy SDK

[Alchemy SDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart)

This is similar to [the blockexplorer code react project](https://github.com/alchemyplatform/blockexplorer). However, I think it is much easier to do this in Next.js.

We can leveraging Next.js' Folder Routing to build various explorer endpoints:

- Get Block Info: `/block/[blocknumber]`
- Get Transaction Info: `/tx/[hash]`

# Run

Create a `.env` file using the provided `.env.sample` and provide your Achemy API Key.

```
yarn dev
```

Then browse to `http://localhost:3000`
