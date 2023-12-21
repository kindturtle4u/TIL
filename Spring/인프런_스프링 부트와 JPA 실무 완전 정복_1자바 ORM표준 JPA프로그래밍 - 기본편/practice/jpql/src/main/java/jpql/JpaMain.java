package jpql;

import org.hibernate.SQLQuery;

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
            Team team = new Team();
            team.setName("team");
            em.persist(team);

            Member member = new Member();
            member.setUsername("member1" );
            member.setAge(10);
            member.changeTeam(team);
            em.persist(member);

            em.flush();
            em.clear();

            String query = "select m from Member m inner join m.team t";
            List<Member> resultList = em.createQuery(query, Member.class)
                    .getResultList();

            System.out.println(resultList.get(0));
            System.out.println(resultList.get(0).getTeam());


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
