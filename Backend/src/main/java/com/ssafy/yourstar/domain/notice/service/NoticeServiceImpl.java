package com.ssafy.yourstar.domain.notice.service;

import com.ssafy.yourstar.domain.notice.db.entity.Notice;
import com.ssafy.yourstar.domain.notice.db.repository.NoticeRepository;
import com.ssafy.yourstar.domain.notice.request.NoticeReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Notice noticeRegister(NoticeReq noticeRegister) {
        Notice notice = new Notice();

        notice.setNoticeTitle(noticeRegister.getNoticeTitle());
        notice.setNoticeContent(noticeRegister.getNoticeTitle());

        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> noticeList() {
        return noticeRepository.findAll(Sort.by("noticeId").descending());
    }

    @Override
    public Notice noticeModify(int noticeId, Notice notice) {
        // 해당 공지사항이 존재하면 수정. 존재하지 않으면 null 반환
        if (noticeRepository.findById(noticeId).isPresent()) {
//            Notice notice = new Notice();
//
//            notice.setNoticeId(noticeId);
//            notice.setNoticeTitle(noticeModify.getNoticeTitle());
//            notice.setNoticeContent(noticeModify.getNoticeTitle());

            return noticeRepository.save(notice);
        } else return null;
    }

    @Override
    public boolean noticeRemove(int noticeId) {
        // 해당 공지사항이 존재하면 삭제 후 true 반환. 그렇지 않으면 false 반환
        if (noticeRepository.findById(noticeId).isPresent()) {
            noticeRepository.deleteById(noticeId);
            return true;
        } else return false;
    }
}
