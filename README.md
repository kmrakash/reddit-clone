# Handle Create Post Steps

- create new post object => type post
- store the post in db
- check if image is selected
  - store in storage => getDownload URL (return ImageURL)
  - update the post doc by adding ImageUrl
- redirect the user back to the communityPage uring the router

Note : check if communityId is valid

# Post Atom

```javascript
    post type
        id : string
        communityId: string
        creatorId : string
        creatorDisplayName: string
        title: string
        body?: string
        numberOfComments : number
        voteStatus: number
        imageUrl? : string
        createdAt: Timestamp

    Post State
        selectedPost : Post | null
        posts: Post[]
```
