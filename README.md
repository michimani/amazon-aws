amazon-aws
===

The quiz "Amazon" or "AWS" or neither?

It can be played here. [Quiz Amazon or AWS](https://michimani.net/app/amazon-aws/)

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

## Run at local

```bash
npm start
```

## Build

```bash
npm run build
```

## Deploy

```bash
export S3_BUCKET='hoge'
export CF_DIST_ID='fuga'
aws s3 sync "build/" "s3://${S3_BUCKET}/app/amazon-aws/" \
&& aws cloudfront create-invalidation --distribution-id "${CF_DIST_ID}" --paths "/app/amazon-aws/*"
```

## Author

[@michimani210](https://twitter.com/michimani210)