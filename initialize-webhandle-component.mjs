import createInitializeWebhandleComponent from "@webhandle/initialize-webhandle-component/create-initialize-webhandle-component.mjs"
import ComponentManager from "@webhandle/initialize-webhandle-component/component-manager.mjs"
import path from "node:path"
import * as cheerio from 'cheerio';

const initializeWebhandleComponent = createInitializeWebhandleComponent()

initializeWebhandleComponent.componentName = '@webhandle/firefox-importmap-consolidator'
initializeWebhandleComponent.componentDir = import.meta.dirname
initializeWebhandleComponent.defaultConfig = {
	"alwaysRewriteImportMaps": false
}
initializeWebhandleComponent.staticFilePath = 'public'
initializeWebhandleComponent.templatePath = 'views'


initializeWebhandleComponent.setup = async function(webhandle, config) {
	let manager = new ComponentManager()
	manager.config = config
	
	webhandle.routers.preParmParse.use((req, res, next) => {
		if(req.agentInfo?.browser === 'firefox' || config.alwaysRewriteImportMaps) {
			res.addFilter(html => {
				let first = html.indexOf('type="importmap"')
				let last = html.lastIndexOf('type="importmap"')
				if(first != last || config.alwaysRewriteImportMaps) {
					const $ = cheerio.load(html);
					let nodeMaps = $('script[type="importmap"]')
					let objs = []
					nodeMaps.each(function(val) {
						let map = JSON.parse($(this).html())
						objs.push(map.imports)
					})
					
					let combined = Object.assign({}, ...objs)
					nodeMaps.remove()
					
					let content
					let nodeMap = $('head').prepend('<script type="importmap">' + JSON.stringify({imports: combined}, null, webhandle.development ? '\t' : '') + '</script>')
					return $.html()
				}
				return html
			})

		}
		
		next()
	})

	manager.addExternalResources = (externalResourceManager, options) => {
	}

	return manager
}

export default initializeWebhandleComponent
