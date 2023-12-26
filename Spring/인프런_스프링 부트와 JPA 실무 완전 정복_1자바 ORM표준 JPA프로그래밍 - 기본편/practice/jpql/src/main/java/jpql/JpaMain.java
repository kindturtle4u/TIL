package jpql;

import org.hibernate.SQLQuery;
import org.hibernate.mapping.Collection;

import javax.persistence.*;
import java.util.HashMap;
import java.util.List;

public class JpaMain {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");


        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        //code
        try {
            Team teamA = new Team();
            teamA.setName("teamA");
            em.persist(teamA);

            Team teamB = new Team();
            teamB.setName("teamB");
            em.persist(teamB);

            Member member1 = new Member();
            member1.setUsername("회원1");
            member1.changeTeam(teamA);
            em.persist(member1);

            Member member2 = new Member();
            member2.setUsername("회원2");
            member2.changeTeam(teamA);
            em.persist(member2);

            Member member3 = new Member();
            member3.setUsername("회원3");
            member3.changeTeam(teamB);
            em.persist(member3);

//            em.flush();
//            em.clear();

            // flush 자동호출
            int resultCount = em.createQuery("update Member m set m.age = 20")
                    .executeUpdate();

            //em.clear();
            Member findMember = em.find(Member.class, member1.getId());

            System.out.println("findMember.getAge() = " + findMember.getAge());
//            //String query = "select m from Member m join fetch m.team";
//            String query = "select m from Member m where m.id = :member";
//            Member findMember = em.createQuery(query, Member.class)
//                    .setParameter("member", member1.getId())
//                    .getSingleResult();
//
//            System.out.println("findMember = " + findMember);
//            List<Team> resultList = em.createQuery(query, Team.class).getResultList();
//
//            for (Team team : resultList) {
//                System.out.println("team = " + team.getName() + "|members: " + team.getMembers().size());
//            }
//            for (Member member : resultList) {
//                System.out.println("member = " + member.getUsername() + ", " + member.getTeam().getName());
//            }
//            String query = "select t.members.size from Team t";
//            em.createQuery(query, Collection.class).getResultList();

//            System.out.println(resultList.get(0));
//            System.out.println(resultList.get(0).getTeam());


//            List<MemberDTO> resultList = em.createQuery("select new jpql.MemberDTO(m.username, m.age) from Member as m", MemberDTO.class)
//                    .getResultList();
//
//            MemberDTO memberDTO = resultList.get(0);
//            System.out.println("memberDTO.getUsername() = " + memberDTO.getUsername());
//            System.out.println("memberDTO.getAge() = " + memberDTO.getAge());

//            List resultList = em.createQuery("select m.username, m.age from Member as m")
//                    .getResultList();
//
//            Object o = resultList.get(0);
//            Object[] result = (Object[]) o;
//
//            System.out.println("username = " + result[0]);
//            System.out.println("age = " + result[1]);


//            TypedQuery<Member> query1 = em.createQuery("select m from Member as m", Member.class);
//            TypedQuery<String> query2 = em.createQuery("select m.username from Member as m", String.class);
//            Query query3 = em.createQuery("select m.username, m.age from Member as m");
//
//
//            Member singleResult = em.createQuery("select m from Member m where m.username = :username", Member.class)
//                    .setParameter("username", "member1")
//                    .getSingleResult();
//
//            System.out.println("singleResult = " + singleResult.getUsername());


            tx.commit();
        } catch (Exception e) {
            tx.rollback();
        } finally {
            em.close();
        }

        emf.close();
    }
}
