## Getting Started

```
$ now dev .
```

## How to use

```
    const response = await fetch('https://jp-tokenize-api.yukihirai0505.now.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: inputVal })
    })
    console.log(response.json())
```
