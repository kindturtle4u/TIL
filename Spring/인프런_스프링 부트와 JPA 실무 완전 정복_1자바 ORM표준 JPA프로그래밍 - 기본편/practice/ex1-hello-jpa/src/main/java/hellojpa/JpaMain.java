package hellojpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class JpaMain {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");

        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        //code
        try {
            Movie movie = new Movie();
            movie.setDirector("aaaa");
            movie.setActor("bbbb");
            movie.setPrice(2000);
            em.persist(movie);


            em.flush();
            em.clear();

            Movie find = em.find(Movie.class, movie.getId());
            System.out.println("find = " + find);

            tx.commit();
//            Team team = new Team();
//            team.setName("TeamA");
//            em.persist(team);
//
//            Member member = new Member();
//            member.setName("member1");
//            member.setTeam(team);
//            em.persist(member);
//
//            Member member2 = new Member();
//            member2.setName("member2");
//            member2.setTeam(team);
//            em.persist(member2);
//
//            em.flush();
//            em.clear();
//
//            Member findMember = em.find(Member.class, member2.getId());
//            List<Member> members = findMember.getTeam().getMembers();
//
//            for (Member m : members) {
//                System.out.println("m.getName() = " + m.getName());
//            }
//
//            tx.commit();
//            Team team = new Team();
//            team.setName("TeamA");
//            em.persist(team);
//
//            Member member = new Member();
//            member.setName("member1");
//            member.setTeamId(team.getId());
//            em.persist(member);
//
//
//            Member findMember = em.find(Member.class, member.getId());
//            Long findTeamId = findMember.getTeamId();
//            Team findTeam = em.find(Team.class, findTeamId);
//
//            tx.commit();
            //insert
//            Member member = new Member();
//            member.setId(1L);
//            member.setUsername("memberA");
//            member.setRoleType(RoleType.ADMIN);
//            em.persist(member);
//            tx.commit();

            //update
//            Member findMember = em.find(Member.class, 1L);
//            findMember.setName("HelloJPA");
//            tx.commit();

            // delete
//            Member findMember = em.find(Member.class, 1L);
//            em.remove(findMember);
//            tx.commit();

            //JPQL
//            List<Member> result = em.createQuery("select m from Member as m", Member.class)
//                    .getResultList();
//
//            for (Member member : result) {
//                System.out.println("member.getName() = " + member.getName());
//            }

//
//            List<Member> result = em.createQuery("select m from Member as m", Member.class)
//                    .setFirstResult(1)
//                    .setMaxResults(10)
//                    .getResultList();
//
//            for (Member member : result) {
//                System.out.println("member.getName() = " + member.getName());
//            }




        } catch (Exception e) {
            tx.rollback();
        } finally {
            em.close();
        }

        emf.close();
    }
}
