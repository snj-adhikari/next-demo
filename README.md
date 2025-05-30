# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## How to use it?

```
yarn install
```

Run on dev mode
```
yarn run dev
```

## Task
The task is to fetch cars data and pageData from the local api (/api/cars and /api/page) respectively and use that data to build an archive cars page.

## The requirements are:
* Only display cars by make name that has atleast one family image.
* Each make's families must be ordered by image first priority. 
* The order between families of the same make is not important when family have more than one or two images.
* Display pageInfo title, content at the top of the page. You can use your creative imagination to styled it but please follow w3c best practices standards of html elements.
* Display the structured make in list with 3 column fashion. Please use mordern flexbox or grid css

## Things to consider
* Any data fetching and structuring logic should consider efficiency, performance, code readability in mind
