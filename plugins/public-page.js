

module.exports = function(ext) {


'use strict'

/**
 * catogory
 */

var 
local = ext.local
,setting = ext.setting
,tools = ext.tools
,log = ext.log
,err = ext.err
,db = ext.db
,path = require('path')
,baseThemeViewPath = ext.baseThemeViewPath
,Pager = ext.Pager
,pager = ext.pager
,getCats = ext.getCats
,getPosts = ext.getPosts

var extend = {}

function buildThemeRes(host) {
	return host + '/' + (setting.theme.name?setting.theme.name:setting.theme)
}

extend.home = function* (next) {

	try {

		let user = this.session.user
		this.local.user = user

		var objc = yield getCats()

		Object.assign(this.local, {
			themeRes: buildThemeRes(this.local.host)
			,publicRoute: setting.publicRoute
			,createUrl: tools.createUrl
			,cats: objc.cats
		})

		this.render(baseThemeViewPath + 'home', this.local)

	} catch(e) {

		err('failed render home page', e)
		this.status = 500
		this.local.error = e
		this.render('views/page/500', this.local)

	}

}

extend.post = function* (next) {

	try {

		let params = this.params
		let sea = tools.createQueryObj(params, [':_id', ':id', ':slug'])
		if(!sea) return yield next

		let user = this.session.user
		this.local.user = user

		let post = yield getPosts(sea)

		if(!post) return yield next

		var obj = yield getCats()

		Object.assign(this.local, {
			post: post
			,publicRoute: setting.publicRoute
			,createUrl:tools.createUrl
			,themeRes: buildThemeRes(this.local.host)
			,cats: obj.cats
		})
		
		this.render(baseThemeViewPath + '/post', this.local)

	} catch(e) {

		err('failed render single post page', e)
		this.status = 500
		this.local.error = e
		this.render('views/page/500', this.local)

	}

}

extend.cat = function* (next) {

	try {

		let params = this.params
		let query = this.query
		let sea = tools.createQueryObj(params, [':_id', ':id', ':slug'])
		if(!sea) return yield next

		let catObj = yield getCats(sea)
		if(!catObj) return yield next

		let page = query.page || 1
		page = parseInt(page, 10) || 1
		let pageSize = query.pageSize || setting.pageSize
		pageSize = parseInt(pageSize, 10) || setting.pageSize

		let user = this.session.user
		this.local.user = user

		let obj = yield getPosts({
			page: page
			,pageSize: pageSize
			,catId: catObj._id
		})

		var objc = yield getCats()

		let pagerHtml = pager.render({
			page: page
			,pageSize: pageSize
			,total: obj.total
			,url: this.path
		})

		Object.assign(this.local, {
			posts: obj.posts
			,page: page
			,pageSize: pageSize
			,total: obj.total
			,cat: catObj
			,pager: pagerHtml
			,themeRes: buildThemeRes(this.local.host)
			,publicRoute: setting.publicRoute
			,createUrl: tools.createUrl
			,cats: objc.cats
		})

		this.render(baseThemeViewPath + 'category', this.local)

	} catch(e) {

		err('failed render cat page', e)
		this.status = 500
		this.local.error = e
		this.render('views/page/500', this.local)

	}

}

extend.search = function* (next) {

	try {

		let query = this.query

		let page = query.page || 1
		page = parseInt(page, 10) || 1
		let pageSize = query.pageSize || setting.pageSize
		pageSize = parseInt(pageSize, 10) || setting.pageSize

		let user = this.session.user
		this.local.user = user

		let obj = yield getPosts({
			page: page
			,pageSize: pageSize
			,title: query.title
		})

		var objc = yield getCats()

		let pagerHtml = pager.render({
			page: page
			,pageSize: pageSize
			,total: obj.total
			,url: this.path
		})

		Object.assign(this.local, {
			posts: obj.posts
			,page: page
			,pageSize: pageSize
			,total: obj.total
			,pager: pagerHtml
			,themeRes: buildThemeRes(this.local.host)
			,publicRoute: setting.publicRoute
			,createUrl: tools.createUrl
			,cats: objc.cats
			,keyword: query.title
		})

		this.render(baseThemeViewPath + 'search', this.local)

	} catch(e) {

		err('failed render cat page', e)
		this.status = 500
		this.local.error = e
		this.render('views/page/500', this.local)

	}

}


return extend

////end
}
