package thread.control.volatile1;

import static util.MyLogger.log;
import static util.ThreadUtils.sleep;

public class VolatileCountMain {
    public static void main(String[] args) {
        MyTask myTask = new MyTask();
        Thread t = new Thread(myTask, "work");

        t.start();

        sleep(1000);
        myTask.flag = false;
        log("flag = " + myTask.flag + ", count = " + myTask.count + " in while()");
    }

    static class MyTask implements Runnable {
        boolean flag = true;
        long count;

        //volatile boolean flag = true;
        //volatile long count;


        @Override
        public void run() {
            while (flag) {
                count++;

                // 1억번에 한번씩 출력
                if (count % 100_000_000 == 0) {
                    log("flag = " + flag + ", count = " + count + " in while()");
                }

            }
            log("flag = " + flag + ", count = " + count + " in 종료");
        }
    }
}
