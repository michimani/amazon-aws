amazon-aws
===

"Amazon" or "AWS" or neither?

## Source

[AWS Documentation](https://docs.aws.amazon.com/)

Generate `amazon-aws.json` data.

```js
res = [];
document.querySelectorAll('section[aria-labelledby=user_guides] li').forEach((e) => {
    const prefix = e.querySelector('span').innerText;
    const name = e.querySelector('a').innerText;
    const url = e.querySelector('a').href.replace('?id=docs_gateway', '');
    res.push({prefix: prefix, name: name, url: url});
})
console.log(JSON.stringify(res));
```

## Author

[@michimani210](https://twitter.com/michimani210)