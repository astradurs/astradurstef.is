// ./nextjs-app/sanity/lib/queries.ts

import { groq } from "next-sanity"

// Get all posts
export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
    _id, title, slug, categories
  }`

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
    title, slug, mainImage, body
  }`

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`

export const postsCategoriesQuery = groq`*[_type == "category"] | order(precedence asc){
  _id, title, slug
}`

export const postsByCategoryQuery = groq`*[_type == "post" && $category in categories[]->slug.current]{
  _id, title, slug, categories, mainImage, body
}`

export const postCategoryQuery = groq`*[_type == "category" && slug.current == $slug][0]{
  _id, title, slug
}`

export const authorsQuery = groq`*[_type == "author"][0]{
  image, name, bio
}`

export const primaImageQuery = groq`*[_type == "myImage"][0]{
  image, alt
}`

export const eventsQuery = groq`*[_type == "gdcevent"]{
  _id, title, body, slug, date, location, limit
} | order(date asc)`

export const eventsByIsoDateQuery = groq`*[_type == "gdcevent" && date >= $lowestDate && date <= $highestDate]{
  _id, title, body, slug, date, location, limit
} | order(date asc)`

export const eventQuery = groq`*[_type == "gdcevent" && slug.current == $slug][0]{ 
  title, slug, body, date, location, limit, image, registration_start, registration_end
}`
