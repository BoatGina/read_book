import express from 'express'
import share from '../../controller/share'

const shareRouter = express.Router()

shareRouter
	.get('/getCommont', async(req, res) => { 
		const result = await share.getCommont();
		res.json(result)
	})
	.get('/getCommontList', async(req, res) => { 
		const { comment_id } = req.query
		const result = await share.getCommontList(comment_id);
		res.json(result)
	})
	.get('/getReplyList', async(req, res) => { 
		const { reply_id } = req.query
		const result = await share.getReplyList(reply_id);
		res.json(result)
	})
	.post('/addCommont', async(req, res) => { 
		const update = req.body;
		const result = await share.addCommont(update);
		res.json(result);
	})
	.post('/addCommontList', async(req, res) => { 
		const update = req.body;
		const result = await share.addCommontList(update);
		res.json(result);
	})
	.post('/addReplyList', async(req, res) => { 
		const update = req.body;
		const result = await share.addReplyList(update);
		res.json(result);
	})
	.get('/getZan', async(req, res) => { 
		const { share_id } = req.query
		console.log('getZan-share_id:',share_id)
		const result = await share.getZan(share_id);
		res.json(result)
	})
	.post('/addZan', async(req, res) => { 
		const {share_id} = req.body;
		console.log('addZan-req.body:',req.body)
		const result = await share.addZan(share_id);
		res.json(result);
	})
	.post('/delZan', async(req, res) => { 
		const {share_id} = req.body;
		console.log('delZan-req.body:',req.body)
		const result = await share.delZan(share_id);
		res.json(result);
	})
	

export default shareRouter