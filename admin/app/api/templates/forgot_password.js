const html =

    `
<html>

<head>
    <title>Forget Password Email</title>
</head>

<body></body>
    <div>
        <h3>Dear ${name},</h3>
        <p>You requested for a password reset, kindly use this <a href="${url}">link</a> to reset your password</p>
        <br>
        <p>Cheers!</p>
    </div>

</body>

</html>

`
module.exports = { html }

