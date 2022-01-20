package com.ssafy.yourstar.domain.member.service;

import com.ssafy.yourstar.domain.member.db.entity.Member;
import com.ssafy.yourstar.domain.member.db.repository.MemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements  MemberService {

    @Autowired
    private MemberRepositorySupport memberRepositorySupport;

    @Override
    public Member loginMemberByMemberEmail(String memberEmail) {
        Member member = memberRepositorySupport.memberLoginByMemberEmail(memberEmail).get();
        return member;
    }
}