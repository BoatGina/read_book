import { getCommont, getCommontList, getReplyList } from "@/api/share.js";

export const getAllCommont = async (commentList) => {
    let rs = [];
    commentList.split(',').forEach(async (comment_id) => {
        const data = (await getCommontList(comment_id)).data.data;
        let replyList = [];
        if (data.replyList) {
            data.replyList.split(',').forEach(async (reply_id) => {
                const data = (await getReplyList(reply_id)).data.data;
                replyList.push(data)
            })
        }
        data.replyList = replyList;
        rs.push(data);
    })
    return rs;
}

