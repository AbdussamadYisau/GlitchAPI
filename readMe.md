# Glitch-Backend-Challenge

A single express API endpoint route [HTTP POST]


## payload 
```
{
  "csv":{
    "url": "https://linktocsv",
    "select_fields": ["First Name", "Last Name", "Age"],
  }
}
```

##   response

``` 
{
  "conversion_key": "ZEMAHBb54vkFXPHA9jHY6Xp3gMnMAKYg",
  "json": [
    {
      "First Name":"Ade",
      "Last Name":"Stark",
      "Age": 21 
    },
    {
      "First Name":"Ade",
      "Last Name":"Stark",
      "Age": 21 
    }
  ]
}

```
## Testing on Postman

![Image of Testing With Glitch Link, no specified field](https://github.com/AbdussamadYisau/GlitchAPI/blob/master/assets/testGlitchMe.png)

![Image of Localhost Testing With Specified field](https://github.com/AbdussamadYisau/GlitchAPI/blob/master/assets/specifiedField.png)

![Image of Localhost Testing with Invalid URL](https://github.com/AbdussamadYisau/GlitchAPI/blob/master/assets/invalidURL.png)

## Made by [Abdussamad Yisau](https://github.com/AbdussamadYisau/)

Find out more about this project [here](https://glitch.com/~outstanding-amused-sombrero) 

( ᵔ ᴥ ᵔ )
