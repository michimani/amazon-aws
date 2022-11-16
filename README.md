amazon-aws
===

The quiz "Amazon" or "AWS" or neither?

It can be played here. [Quiz Amazon or AWS](https://michimani.net/app/amazon-aws/)

## Source

[AWS Documentation](https://docs.aws.amazon.com/)

Generate `amazon-aws.json` data.

```js
res = [];
checked = [];
document.querySelectorAll('section[aria-labelledby=user_guides] li').forEach((e) => {
    const fullName = e.querySelector('span').innerText;
    if (checked.includes(fullName) == true) {
        return;
    }
    checked.push(fullName);
    let prefix = '';
    let name = '';
    let prefixIdx = fullName.indexOf('AWS ');
    if (prefixIdx == 0) {
        prefix = 'AWS'
        name = fullName.replace('AWS ', '');
    } else if (prefixIdx < 0) {
        prefixIdx = fullName.indexOf('Amazon ');
        if (prefixIdx == 0) {
            prefix = 'Amazon'
            name = fullName.replace('Amazon ', '');
        }
    }

    if (name == '') {
        name = fullName;
    }
    const fullURL = e.querySelector('a').href;
    const queryIdx = fullURL.indexOf('?');
    let url = '';
    if (queryIdx < 0) {
        url = fullURL;
    } else {
        url = fullURL.substring(0, queryIdx);
    }
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