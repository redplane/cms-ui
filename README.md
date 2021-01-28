# CMS UI

CMS UI provides a list of special components which are usually used by many projects.
It only provides base classes or components which are not specified to any UI Framework to let developer free to choose their suitable implementation.

**IMPORTANT**: At the moment, [CMS UI](https://github.com/redplane/cms-ui) only supports Angular 11 and above.

It provides components below:

- **[Spinner](https://cms-ui-core.netlify.app/spinner-demo)**
- **[Banner](https://cms-ui-core.netlify.app/banner-demo)**
- **[Smart navigator](https://cms-ui-core.netlify.app/smart-navigator-demo)**
- **[Dialog](https://cms-ui-core.netlify.app/dialog-demo)**
- **[Validation summarizer](https://cms-ui-core.netlify.app/validation-summarizer-demo)**

## I. Why to choose **CMS UI**

Please refer to `<video link>` to know the common problems developer have to resolve while developing **WEB** application or **Hybrid** application.

## II. Installation

For now, [CMS UI](https://github.com/redplane/cms-ui) is still in development stage. Only preview versions are published on [MyGet hosting](https://myget.org/).
To install from [MyGet hosting](https://myget.org/), please follow these steps below:

- In your **Angular** project, open the **package.json** file

![alt text][logo]

[logo]: https://i.ibb.co/wLVd3JP/step-01.png "package.json"

- In **dependencies** section, add the following line:
  
`"@cms-ui/core": "https://www.myget.org/F/cms-ui/npm/@cms-ui/core/-/(version).tgz"`

**(version)** can be found [here](https://www.myget.org/feed/cms-ui/package/npm/@cms-ui/core).

Let say, we want to install version `1.0.0-preview-017`, the following line must be:

`"@cms-ui/core": "https://www.myget.org/F/cms-ui/npm/@cms-ui/core/-/1.0.0-preview-017.tgz",`

- Save **package.json** file.
- Open **terminal** or **command prompt**, navigate to project folder. Run: `npm install`
- The library is ready to go.

## III. Import

[CMS UI](https://github.com/redplane/cms-ui) components are separated into many modules, base on developer's need, these modules below can be imported one by one or all of them:
- **BannerModule**
- **SmartNavigatorModule**
- **SpinnerContainerModule**
- **ValidationSummarizerModule**

## IV. Issues & Pull requests

Because this library is in development stage, there can be many issues.

Issues can be found or made [here](https://github.com/redplane/cms-ui/issues)

Any helps are appreciated, if you want to contribute to the project, you can make **Pull request** to **master** branch.

Pull requests will be listed [here](https://github.com/redplane/cms-ui/pulls)
