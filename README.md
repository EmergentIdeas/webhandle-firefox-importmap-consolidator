# @webhandle/firefox-importmap-consolidator

Adds a webhandle response filter to combine import maps for firefox or
if it is configured to.

## Install

```bash
npm install @webhandle/firefox-importmap-consolidator
```

## Configurization

```json
{
	"@webhandle/firefox-importmap-consolidator": {
		"alwaysRewriteImportMaps": false
	}
}
```

## Initialization 

```js
import setupFirefoxImportmapConsolidator from "@webhandle/initialize-webhandle-component.mjs"
let managerFirefoxImportmapConsolidator = await setupFirefoxImportmapConsolidator(webhandle)
```