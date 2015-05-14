<?php
/**
 * Created by PhpStorm.
 * User: Omayma Abulrub
 * Date: 11/30/2014
 * Time: 11:19 PM
 */

include_once "Jobseeker_DB.php";

$GLOBALS['db']=new Jobseeker_DB($host,$username,$password,$database);

class Jobseeker_Form extends Jobseeker_DB {
    var $current_user;//logged in user
    var $db_table;//active table

    public function __construct($current_user,$db_table){
        $this->current_user=$current_user;
        $this->db_table=$db_table;
//        $request=$request;
//        var_dump($request);

        //Ajax Client Requests
        $this->Dispatcher();
    }//__construct


    //Dispatch the Ajax Client Requests
    public function Dispatcher(){
        if(isset($GLOBALS['request'])){
            $opcode='opcode';
            $opcode=$GLOBALS['request']->$opcode;
//            var_dump($request);
            switch($opcode){
                case 'addPostRequest':
                    $this->add_post();
                    break;
                case 'getAllPostsRequest':
                    $this->get_posts();
                    break;
                case 'getAllPostsByPageNumberRequest':
                    $this->getAllPostsByPageNumber();
                    break;
                case 'getAllJobsByPageNumberRequest':
                    $this->getAllJobsByPageNumber();
                    break;
                case 'getSinglePostRequest':
                    $this->getSinglePost();
                    break;
                case 'deletePostRequest':
                    $this->delete_post();
                    break;
                case 'addJobRequest':
                    $this->add_job();
                    break;
                case 'getAllJobsRequest':
                    $this->get_jobs();
                    break;
                case 'getSingleJobRequest':
                    $this->getSingleJob();
                    break;
                case 'deleteJobRequest':
                    $this->delete_job();
                    break;
                case 'validateJobseekerRequest':
                    $this->validateJobseekerRequest();
                    break;
                case 'sendMessageRequest':
                    $this->send_message();
                    break;
                case 'viewProfileRequest':
                    $this->viewProfile();
                    break;
                case 'getMessagesRequest':
                    $this->getMessages();
                    break;
                case 'updatePostRequest':
                    $this->update_post();
                    break;
                case 'updateJobRequest':
                    $this->update_job();
                    break;
                case 'addCommentRequest':
                    $this->add_comment();
                     break;
                case 'getCommentsRequest':
                    $this->get_comments();
                    break;
                case 'editCommentRequest':
                    $this->edit_comment();
                    break;
                case 'deleteCommentRequest':
                    $this->delete_comment();
                    break;
                case 'addCommentJobRequest':
                    $this->add_commentJob();
                    break;
                case 'getCommentsJobRequest':
                    $this->get_commentsJob();
                    break;
                case 'editCommentJobRequest':
                    $this->edit_commentJob();
                    break;
                case 'deleteCommentJobRequest':
                    $this->delete_commentJob();
                    break;
                case 'createAccountRequest':
                    $this->createAccount();
                    break;
                case 'searchRequest':
                    $this->search();
                    break;
                case'getAllJobsFromLastIdRequest':
                    $this->getAllJobsFromLastId();
                    break;
                case'addToJobListRequest':
                    $this->addToJobList();
                    break;
                case'getJobListRequest':
                    $this->getJobList();
                    break;
                case'getJobsNotificationsRequest':
                    $this->getJobsNotifications();
                    break;
                case 'addEventRequest':
                    $this->add_event();
                    break;
                case 'getEventsRequest':
                    $this->get_events();
                    break;
                case 'deleteEventRequest':
                    $this->delete_event();
                    break;
                case 'editEventRequest':
                    $this->edit_event();
                    break;
                case 'getRemainderRequest':
                    $this->get_remainder();
                    break;
                case 'getFromJobListByPageNumberRequest':
                    $this->getFromJobListByPageNumberRequest();
                    break;
                case 'sendEmailToPRequest':
                    $this->sendEmailToP();
                    break;
                case 'getAllMessagesFromPRequest':
                    $this->getAllMessagesFromP();
                    break;
                case 'loginProviderRequest':
                    $this->loginProvider();
                    break;
                case 'applyForJobRequest':
                    $this->applyForJob();
                    break;
                case 'getSkillsWithSynonymsRequest':
                    $this->getSynonyms();
                    break;
                case 'deleteMessageFromProRequest':
                    $this->deleteMessageFromPro();
                    break;
                case 'getMsgsNotificationsRequest':
                    $this->getMsgsNotifications();
                    break;
                case 'getCommentsNotificationsRequest':
                    $this->getCommentsNotifications();
                    break;
                case 'getAllNotificationsRequest':
                    $this->getAllNotifications();
                    break;
                case 'getAllRemaindersRequest':
                    $this->getRemindersHistory();
                    break;
                case 'autoCompleteRequest':
                    $this->autoComplete();
                    break;
                case 'getMsgsHistoryRequest':
                    $this->getMsgsHistoryRequest();
                    break;
                case 'getJobsHistoryRequest':
                    $this->getJobsHistory();
                    break;



            }


        }
    }

    public function getAllJobsFromLastId(){
        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;

        $lastJobId='select lastJobId from jobseekers where jobseeker_id='.$js_id;
        $result=$GLOBALS['db']->db_query($lastJobId);
        $row = $GLOBALS['db']->db_assoc($result);
        $lastJobId=$row['lastJobId'];


        $sql='select * from job where jobId>'.$lastJobId;
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }

        $jobId='select jobId from job order by jobId DESC limit 1 ';
        $result=$GLOBALS['db']->db_query($jobId);
        $row = $GLOBALS['db']->db_assoc($result);
        $jobId=$row['jobId'];

//        $last_id=$GLOBALS['db']->db_insid();
        $updateSql= 'update jobseekers set lastJobId='.$jobId.' where jobseeker_id='.$js_id;
        $result=$GLOBALS['db']->db_query($updateSql);

        print(json_encode($total));
    }



    
    public function add_post(){

        $entity='Entity';
        $title='title';
        $title=$GLOBALS['request']->$entity->$title;
        $body='body';
        $body=$GLOBALS['request']->$entity->$body;
        $jobseeker_id='jobseeker_id';
        $jobseeker_id=$GLOBALS['request']->$entity-> $jobseeker_id;
        $fullname='fullname';
        $fullname=$GLOBALS['request']->$entity-> $fullname;
        $sql='insert into posts values(NULL,"'.$title.'","'.$body.'",'.$jobseeker_id.',"seen","'.date("Y-m-d H:i:s").'","'.$fullname.'")';
        $GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        $newPost = array('id'=>$last_id,'title' => $title,'body' => $body,'publish_date'=>date("Y-m-d H:i:s"), 'jobseeker_id'=>$jobseeker_id,'status'=>"seen",'full_name'=>$fullname);
        print (json_encode($newPost));

    }




    public function getAllPostsByPageNumber(){
        $pageScrolls='pageScrolls';
        $pageScrolls=$GLOBALS['request']->$pageScrolls;

        $pageNum=abs(intval($pageScrolls));
        $offset=$pageNum*5;


        $sql='select * from posts order by id desc limit 5 offset '.$offset;
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }

    public function getAllJobsByPageNumber(){
        $pageScrolls='pageScrolls';
        $pageScrolls=$GLOBALS['request']->$pageScrolls;

        $pageNum=abs(intval($pageScrolls));
        $offset=$pageNum*5;


        $sql='select job.jobId,job.jobTitle,job.jobDescription, job.jobTag, job.publishDate, job.jobProvider, jobprovider.Name from job,jobprovider where job.jobProvider=jobprovider.jobprovider_id order by jobId desc limit 5 offset '.$offset;
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }



    public function get_posts(){

        $sql='select * from posts order by id desc limit 5';
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }




    public function getSinglePost(){

        $postId='postId';
        $postId=$GLOBALS['request']->$postId;
        $sql='select * from posts where posts.id='.$postId.'';
        $result=$GLOBALS['db']->db_query($sql);
        $row = $GLOBALS['db']->db_assoc($result);

        print(json_encode($row));

    }

    public function delete_post(){
        $postId='postId';
        $postId=$GLOBALS['request']->$postId;

        $sql='delete from posts where id='.$postId;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode("Done"));
    }



    public function update_post()
    {
        $entity='Entity';
        $title='title';
        $title=$GLOBALS['request']->$entity->$title;

        $body='body';
        $body=$GLOBALS['request']->$entity->$body;

        $postId='postId';
        $postId=$GLOBALS['request']->$entity->$postId;


        $sql = 'update posts set title= "'.$title.'",body="'.$body.'" where id='.$postId;
        $GLOBALS['db']->db_query($sql);

        print(json_encode("Done"));
    }

    public function add_job(){

        $entity='Entity';
        $jobTitle='jobTitle';
        $jobTitle=$GLOBALS['request']->$entity->$jobTitle;
        $jobDescription='jobDescription';
        $jobDescription=$GLOBALS['request']->$entity->$jobDescription;
        $jobTag='jobTag';
        $jobTag=$GLOBALS['request']->$entity-> $jobTag;
        $sql='insert into job(jobTitle,jobDescription,jobTag,publishDate,jobProvider) values("'.$jobTitle.'","'.$jobDescription.'","'.$jobTag.'","'.date("Y-m-d H:i:s").'",1000007)';
        $GLOBALS['db']->db_query($sql);


        $last_id=$GLOBALS['db']->db_insid();
        $newPost = array('jobId'=>$last_id,'jobTitle' => $jobTitle,'jobDescription' => $jobDescription,'publishDate'=>date("Y-m-d H:i:s"), 'jobseeker_id'=>1,'jobTag'=>$jobTag);
        print (json_encode($newPost));
    }

    public function get_jobs(){

        $sql='select job.jobId,job.jobTitle,job.jobDescription, job.jobTag, job.publishDate, job.jobProvider, jobprovider.Name from job,jobprovider where job.jobProvider=jobprovider.jobprovider_id order by job.jobId desc limit 5';
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }




    public function getSingleJob(){

        $jobId='jobId';
        $jobId=$GLOBALS['request']->$jobId;
        $sql='select job.jobId,job.jobTitle,job.jobDescription, job.jobTag, job.publishDate, job.jobProvider, jobprovider.Name from job,jobprovider where job.jobProvider=jobprovider.jobprovider_id and job.jobId='.$jobId;
        $result=$GLOBALS['db']->db_query($sql);
        $row = $GLOBALS['db']->db_assoc($result);

        print(json_encode($row));

    }

    public function delete_job(){
        $jobId='jobId';
        $jobId=$GLOBALS['request']->$jobId;

        $sql='delete from job where jobId='.$jobId;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode("Done"));
    }



    public function update_job()
    {
        $entity='Entity';
        $jobTitle='jobTitle';
        $jobTitle=$GLOBALS['request']->$entity->$jobTitle;

        $JobDescription='jobDescription';
        $JobDescription=$GLOBALS['request']->$entity->$JobDescription;

        $JobTag='JobTag';
        $JobTag=$GLOBALS['request']->$entity->$JobTag;

        $jobId='jobId';
        $jobId=$GLOBALS['request']->$entity->$jobId;


        $sql = 'update job set jobTitle= "'.$jobTitle.'",jobDescription="'.$JobDescription.'",jobTag="'.$JobTag.'" where jobId='.$jobId;
        $GLOBALS['db']->db_query($sql);

        print(json_encode("Done"));
    }


    public function validateJobseekerRequest(){
        $entity='Entity';
        $firstName='firstName';
        $firstName=$GLOBALS['request']->$entity->$firstName;
        $lastName='lastName';
        $lastName=$GLOBALS['request']->$entity->$lastName;
        $id='linkedinId';
        $id=$GLOBALS['request']->$entity->$id;
        $emailAddress='email';
        $emailAddress=$GLOBALS['request']->$entity->$emailAddress;
        $pictureUrl='pictureUrl';
        $pictureUrl=$GLOBALS['request']->$entity->$pictureUrl;
        $publicProfileUrl='profileUrl';
        $publicProfileUrl=$GLOBALS['request']->$entity->$publicProfileUrl;
        $industry='industry';
        $industry=$GLOBALS['request']->$entity->$industry;
        $skills='skills';
        $skills=$GLOBALS['request']->$entity->$skills;
        $summary='summary';
        $summary=$GLOBALS['request']->$entity->$summary;
        $location='location';
        $location=$GLOBALS['request']->$entity-> $location;
        $education='educations';
        $education=$GLOBALS['request']->$entity-> $education;
        $sql1='select * from jobseekers where linkedinId="'.$id .'"';
        $result=$GLOBALS['db']->db_query($sql1);
        $row = $GLOBALS['db']->db_assoc($result);
        $js_id=$row['jobseeker_id'];
        if (mysql_num_rows($result)==0)
        {
            $sql='insert into jobseekers VALUES (NULL,"'.$id.'","'. $firstName.'","'. $lastName.'","'.$emailAddress.'","'.$skills.'","'. $publicProfileUrl.'","'.$pictureUrl.'","'.$education.'","'.$summary.'","'.$industry.'","'.$location.'",0)';

        }
        else{
            $sql='update jobseekers set first_name="'. $firstName.'", last_name="'. $lastName.'",Email="'.$emailAddress.'",skills="'.$skills.'",profileUrl="'. $publicProfileUrl.'",pictureUrl="'.$pictureUrl.'",educations="'.$education.'",summary="'.$summary.'",industry="'.$industry.'",location="'.$location.'" where linkedinId="'.$id.'"';
        }

        $GLOBALS['db']->db_query($sql);
        print($js_id);
    }



    public function send_message(){
        $entity='Entity';
        $content='content';
        $content=$GLOBALS['request']->$entity->$content;
        $js_id='from_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $to_id='to_id';
        $to_id=$GLOBALS['request']->$entity->$to_id;
        $sql='insert into messages values(NULL,"'.$content.'","'.date("Y-m-d H:i:s").'",'.$js_id.','.$to_id.')';
        $result=$GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        $newMsg = array('messageId' => $last_id,'content' => $content,'sendate' => date("Y-m-d H:i:s"), 'fromId' => $js_id, 'toId'=>$to_id);
        print (json_encode($newMsg));
    }

    public function getMessages(){

        $entity='Entity';

        $js_id='from_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;

        $to_id='to_id';
        $to_id=$GLOBALS['request']->$entity->$to_id;

        $sql='select * from messages where ( from_id='.$js_id.' and to_id='.$to_id.' ) or ( from_id='.$to_id.' and to_id='.$js_id.' ) order by message_id desc limit 100';
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
    }

    public function viewProfile(){
        $entity='Entity';
        $jobSeekerId='jobSeekerId';
        $jobSeekerId=$GLOBALS['request']->$entity->$jobSeekerId;

        $sql='select * from jobseekers where jobseeker_id='.$jobSeekerId;
        $result=$GLOBALS['db']->db_query($sql);

        $row = $GLOBALS['db']->db_assoc($result);

        print(json_encode($row));

    }
    public function add_comment(){

        $entity='Entity';
        $postId='postId';
        $postId=$GLOBALS['request']->$entity->$postId;
        $content='content';
        $content=$GLOBALS['request']->$entity->$content;
        $user_id='user_id';
        $user_id=$GLOBALS['request']->$entity-> $user_id;
        $full_name='full_name';
        $full_name=$GLOBALS['request']->$entity-> $full_name;
        $sql='insert into comments values(NULL,'.intval($postId).',"'.$content.'","'.date("Y-m-d H:i:s").'",'.intval($user_id).',"'.$full_name.'")';
        $GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        $newComment = array('commentId'=>$last_id,'content' => $content,'postId' => $postId,'date'=>date("Y-m-d H:i:s"), 'userId'=>$user_id,'fullname'=>$full_name);
        print (json_encode($newComment));

    }

    public function get_comments(){
        $postId='postId';
        $entity='Entity';
        $postId=$GLOBALS['request']->$entity->$postId;

        $sql_id='select * from comments where post_id='.$postId.' order by comment_id desc';
        $result_id=$GLOBALS['db']->db_query($sql_id);
//        while($row = $GLOBALS['db']->db_assoc($result_id)){
//            if (intval( $row['user_id'] ) >10000)
//            {
//                $sql='select jobseekers.first_name,jobseekers.last_name,comments.content from comments,jobseekers where jobseekers.jobseeker_id=comments.user_id ';
//                $result=$GLOBALS['db']->db_query($sql);
//            }
//            else
//            {
//                $sql='select jobprovider.Name,comments.content from comments, jobprovider where jobprovider.jobprovider_id=comments.user_id ';
//                $result=$GLOBALS['db']->db_query($sql);
//            }
//        }

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result_id)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }



    public function delete_comment(){
        $entity='Entity';
        $commentId='commentId';
        $commentId=$GLOBALS['request']->$entity->$commentId;

        $cmtIdInt=intval($commentId);
        $sql='delete from comments where comment_id='.$commentId;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode($commentId));
    }

    public function edit_comment()
    {
        $entity='Entity';
        $commentId='commentId';
        $commentId=$GLOBALS['request']->$entity->$commentId;

        $content='content';
        $content=$GLOBALS['request']->$entity->$content;


        $sql = 'update comments set content= "'.$content.'" where comment_id='.$commentId;
        $GLOBALS['db']->db_query($sql);
        $newComment = array('commentId'=>$commentId,'content' => $content);

        print(json_encode($newComment));
    }

    public function add_commentJob(){

        $entity='Entity';
        $jobId='jobId';
        $jobId=$GLOBALS['request']->$entity->$jobId;
        $content='content';
        $content=$GLOBALS['request']->$entity->$content;
        $user_id='user_id';
        $user_id=$GLOBALS['request']->$entity-> $user_id;
        $full_name='full_name';
        $full_name=$GLOBALS['request']->$entity-> $full_name;
        $sql='insert into jobComments values(NULL,'.intval($jobId).',"'.$content.'","'.date("Y-m-d H:i:s").'",'.intval($user_id).',"'.$full_name.'")';
        $GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        $newComment = array('commentId'=>$last_id,'content' => $content,'jobId' => $jobId,'date'=>date("Y-m-d H:i:s"), 'userId'=>$user_id,'fullname'=>"The Is Me");
        print (json_encode($newComment));
    }

    public function get_commentsJob(){
        $entity='Entity';
        $jobId='jobId';
        $jobId=$GLOBALS['request']->$entity->$jobId;

        $sql_id='select * from jobComments where job_id='.$jobId.' order by comment_id desc';
        $result_id=$GLOBALS['db']->db_query($sql_id);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result_id)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }



    public function delete_commentJob(){
        $entity='Entity';
        $commentId='commentId';
        $commentId=$GLOBALS['request']->$entity->$commentId;

        $cmtIdInt=intval($commentId);
        $sql='delete from jobComments where comment_id='.$commentId;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode($commentId));
    }

    public function edit_commentJob()
    {
        $entity='Entity';
        $commentId='commentId';
        $commentId=$GLOBALS['request']->$entity->$commentId;

        $content='content';
        $content=$GLOBALS['request']->$entity->$content;


        $sql = 'update jobComments set content= "'.$content.'" where comment_id='.$commentId;
        $GLOBALS['db']->db_query($sql);
        $newComment = array('commentId'=>$commentId,'content' => $content);

        print(json_encode($newComment));
    }


    public function createAccount()
    {
        $entity='Entity';

        $name='name';
        $name=$GLOBALS['request']->$entity->$name;
        $email='email';
        $email=$GLOBALS['request']->$entity->$email;
        $description='description';
        $description=$GLOBALS['request']->$entity->$description;
        $location='location';
        $location=$GLOBALS['request']->$entity->$location;
        $password='password';
        $password=$GLOBALS['request']->$entity->$password;
        $sql='insert into jobprovider values(NULL,"'.$name.'","'.$email.'","'.$password.'","'.$description.'","'.$location.'")';

        $result=$GLOBALS['db']->db_query($sql);
        print(json_encode($result));



        $to = $email;
        $subject = "Your New Account @ sho3'ol";
        $txt = "You can enter our system using your email and this password: ".$password;
        $headers = "From: info@sho3'ol.com" . "\r\n" .
            "CC: job@sho3'ol.com";

        mail($to,$subject,$txt,$headers);


        //delete from messageProvider
    }


    public function autoComplete(){



        $sql='select first_name,last_name from jobseekers' ;
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }


    public function search(){

        $entity='Entity';
        $search='search';
        $search=$GLOBALS['request']->$entity->$search;

        $sql='select * from jobseekers where first_name LIKE "%' . $search .'%" or last_name LIKE "%' . $search .'%"' ;
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }

    public function addToJobList(){
        $entity='Entity';
        $JobId='jobId';
        $JobId=$GLOBALS['request']->$entity->$JobId;
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $similarity='similarity';
        $similarity=$GLOBALS['request']->$entity->$similarity;
        $sql='insert into joblist VALUES (NULL , '.$js_id.' , '.$JobId.' , '.$similarity.')';
        $GLOBALS['db']->db_query($sql);
//        print(json_encode("Done"));


        $jobTitle='select jobTitle from job where job.jobId='.$JobId;
        $result=$GLOBALS['db']->db_query($jobTitle);
        $row = $GLOBALS['db']->db_assoc($result);
        $jobTitle=$row['jobTitle'];


        $sql1='insert into jobNotification VALUES (NULL ,"New Job Oppurtunity With Similarity = '. $similarity .'%","'.date("Y-m-d H:i:s").'",'.$js_id.','.$JobId.')';
        $result=$GLOBALS['db']->db_query($sql1);
        print(json_encode($result));
    }



    public function getJobList(){
        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $sql='select joblist.jobId,joblist.similarity, job.jobTitle , job.jobDescription, job.jobTag  from joblist , job where joblist.jobId=job.jobId and joblist.jobseekerId='.$js_id.' limit 2';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
    }


    public function getJobsNotifications(){
        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
//        $countNot='countNot';
//        $countNot=$GLOBALS['request']->$entity->$countNot;

        $lastJobNotificationId='select lastSeenJobNotification from jobseekers where jobseeker_id='.$js_id;
        $idResult=$GLOBALS['db']->db_query($lastJobNotificationId);
        $row = $GLOBALS['db']->db_assoc($idResult);
        $lastJobNotificationId=$row['lastSeenJobNotification'];

//        $sql='select count(*) AS "counts", joblist.jobId, notifications.content, notifications.alertDate from joblist,notifications where notifications.notiToId='.$js_id.'and notifications.notiToId=joblist.jobseekerId order by joblist.jobId DESC limit'. $countNot;
        $sql='select jobNotification.content,jobNotification.alertDate,jobNotification.jobId from jobNotification,jobseekers  where jobNotification.notiToId='.$js_id.' and jobseekers.jobseeker_id=jobNotification.notiToId and jobNotification.not_Id>'.$lastJobNotificationId.' order by jobNotification.not_Id desc';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }

        $jobNotificationId='select not_Id from jobNotification order by not_Id DESC limit 1 ';
        $resultLastId=$GLOBALS['db']->db_query($jobNotificationId);
        $row = $GLOBALS['db']->db_assoc($resultLastId);
        $jobNotificationId=$row['not_Id'];

        $updateSql= 'update jobseekers set lastSeenJobNotification='.$jobNotificationId.' where jobseeker_id='.$js_id;
        $GLOBALS['db']->db_query($updateSql);

        print(json_encode($total));
    }

    public function add_event(){

        $entity='Entity';
        $remainderDate='remainderDate';
        $remainderDate=$GLOBALS['request']->$entity->$remainderDate;
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity-> $js_id;
        $eventTitle='eventTitle';
        $eventTitle=$GLOBALS['request']->$entity->$eventTitle;
        $eventDetail='eventDetail';
        $eventDetail=$GLOBALS['request']->$entity-> $eventDetail;
        $jobId='jobId';
        $jobId=$GLOBALS['request']->$entity-> $jobId;
        $sql='insert into events values(NULL,"'.$remainderDate.'",'.$js_id.',"'.$eventTitle.'","'.$eventDetail.'",'.$jobId.')';

        $GLOBALS['db']->db_query($sql);


    }

    public function get_events(){

        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $jobId='jobId';
        $jobId=$GLOBALS['request']->$entity->$jobId;

        $sql='select * from events where jobseeker_id ='.$js_id.' and jobId ='.$jobId;
        $result1=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result1)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }

    public function delete_event(){
        $entity='Entity';
        $eventId='eventId';
        $eventId=$GLOBALS['request']->$entity->$eventId;

        $eventIdInt=intval($eventId);
        $sql='delete from events where eventId='.$eventIdInt;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode("Done"));
    }

    public function edit_event()
    {
        $entity='Entity';
        $editedEventId='editedEventId';
        $editedEventId=$GLOBALS['request']->$entity->$editedEventId;

        $editedEventTitle='editedEventTitle';
        $editedEventTitle=$GLOBALS['request']->$entity->$editedEventTitle;

        $editedEventDetail='editedEventDetail';
        $editedEventDetail=$GLOBALS['request']->$entity->$editedEventDetail;

        $editedRemainderDate='editedRemainderDate';
        $editedRemainderDate=$GLOBALS['request']->$entity->$editedRemainderDate;


        $sql = 'update events set remainderDate="'.$editedRemainderDate.'" and eventTitle= "'.$editedEventTitle.'" and eventDetail= "'.$editedEventDetail.'" where eventId='.$editedEventId;
        $GLOBALS['db']->db_query($sql);
        $newEvent = array('eventId'=>$editedEventId,'remainderDate' => $editedRemainderDate,'eventTitle' => $editedEventTitle,'eventDetail' => $editedEventDetail);

        print(json_encode($newEvent));
    }

    public function get_remainder(){
        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $reminderDate='reminderDate';
        $reminderDate=$GLOBALS['request']->$entity->$reminderDate;


        $lastSeenReminder ='select lastSeenReminder from jobseekers where jobseeker_id='.$js_id;
        $idResult=$GLOBALS['db']->db_query($lastSeenReminder);
        $row = $GLOBALS['db']->db_assoc($idResult);
        $lastSeenReminder=$row['lastSeenReminder'];


        $sql='select remainderDate,eventTitle,jobId from events where jobseeker_id='.$js_id.'  and remainderDate="'.$reminderDate. '"';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();

        while($row = $GLOBALS['db']->db_assoc($result)){
                array_push($total, $row);
        }

        $eventId='select eventId from events order by eventId DESC limit 1 ';
        $resultLastId=$GLOBALS['db']->db_query($eventId);
        $row = $GLOBALS['db']->db_assoc($resultLastId);
        $eventId=$row['eventId'];

        $updateSql= 'update jobseekers set lastSeenReminder='.$eventId.' where jobseeker_id='.$js_id;
        $GLOBALS['db']->db_query($updateSql);

        print(json_encode($total));


//        $email='select Email from jobseekers where jobseeker_id='.$js_id.'';
//        $result3=$GLOBALS['db']->db_query($email);
//        $row = $GLOBALS['db']->db_assoc($result3);
//        $email=$row['email'];
//
//        $to = $email;
//        $subject = "";
//        $txt = "";
//        $headers = "From: info@sho3'ol.com" . "\r\n" .
//            "CC: job@sho3'ol.com";
//
//        mail($to,$subject,$txt,$headers);



    }





    public function  sendSMS($eventTitle,$js_id){


    }

    public function getFromJobListByPageNumberRequest(){
        $Entity='Entity';
        $pageScrolls='pageScrolls';
        $pageScrolls=$GLOBALS['request']->$Entity->$pageScrolls;
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$Entity->$js_id;

        $pageNum=abs(intval($pageScrolls));
        $offset=$pageNum*2;

        $sql='select joblist.jobId,joblist.similarity, job.jobTitle , job.jobDescription, job.jobTag from joblist , job where joblist.jobId=job.jobId and joblist.jobseekerId='.$js_id.' limit 2 offset '.$offset;
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();

        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
        }


public function sendEmailToP(){
    $entity='Entity';
    $email='email';
    $email=$GLOBALS['request']->$entity->$email;
    $content='content';
    $content=$GLOBALS['request']->$entity->$content;
    $sql='insert into messageJobprovider values(NULL,"'.$content.'","'.$email.'")';

    $GLOBALS['db']->db_query($sql);
    $result=$GLOBALS['db']->db_query($sql);
    print (json_encode($result));
}

    public function deleteMessageFromPro(){
        $entity='Entity';
        $messageProId='messageProId';
        $messageProId=$GLOBALS['request']->$entity->$messageProId;

        $sql='delete from messageJobprovider where messageProId='.$messageProId;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode($messageProId));
    }

    
    public function getAllMessagesFromP(){

        $sql='select * from messageJobprovider';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }
    public function loginProvider(){
        $entity='Entity';
        $EmailP='EmailP';
        $EmailP=$GLOBALS['request']->$entity->$EmailP;
        $passwordP='passwordP';
        $passwordP=$GLOBALS['request']->$entity->$passwordP;
        $sql='select * from jobprovider where Email="'.$EmailP.'" and password="'.$passwordP.'"';
        $result=$GLOBALS['db']->db_query($sql);
        $row = $GLOBALS['db']->db_assoc($result);
        $total=array();
        if (mysql_num_rows($row)==0)
        {

        }
        print(json_encode($total));

    }
    public function applyForJob()
    {   $entity='Entity';
        $jobId='jobId';
        $jobId=$GLOBALS['request']->$entity->$jobId;
        $providerId='providerId';
        $providerId=$GLOBALS['request']->$entity->$providerId;
         $jobseeker_id='jobseeker_id';
        $jobseeker_id=$GLOBALS['request']->$entity->$jobseeker_id;
        $sql1='select Email from jobprovider where jobprovider_Id='.$providerId.'';
        $result1=$GLOBALS['db']->db_query($sql1);
        $row1 = $GLOBALS['db']->db_assoc($result1);
        $sql2='select jobTitle from job where job_id='.$jobId.'';
        $result2=$GLOBALS['db']->db_query($sql2);
        $row2 = $GLOBALS['db']->db_assoc($result2);
        $sql3='select profileUrl from jobseekers where jobseeker_id='.$jobseeker_id.'';
        $result3=$GLOBALS['db']->db_query($sql3);
        $row3 = $GLOBALS['db']->db_assoc($result3);
        $sql4='select similarity from joblist where jobseekerId='.$jobseeker_id.'and jobId='.$jobId.'';
        $result4=$GLOBALS['db']->db_query($sql4);
        $row4 = $GLOBALS['db']->db_assoc($result4);
        if ($row4==0){
            $to = $row1[0];
            $subject = " New Apply for ".$row2[0]."  @ sho3'ol";
            $txt = "You have new apply for".$row2[0]."from jobseeker with similarity ".$row4[0]."and this is his/her linkedIn profile".$row3[0]." ";
            $headers = "From: info@sho3'ol.com" . "\r\n" .
                "CC: job@sho3'ol.com";

            mail($to,$subject,$txt,$headers);
        }else{$to = $row1[0];
            $subject = " New Apply for ".$row2[0]."  @ sho3'ol";
            $txt = "You have new apply for".$row2[0]."from jobseeker with similarity <70 and this is his/her linkedIn profile".$row3[0]." ";
            $headers = "From: info@sho3'ol.com" . "\r\n" .
                "CC: job@sho3'ol.com";
            mail($to,$subject,$txt,$headers);}
        $sql='insert into appliesJob values(NULL,'.$jobId.','.$providerId.','.$jobseeker_id.')';
        $GLOBALS['db']->db_query($sql);
        print (json_encode("done"));
    }


    public function getSynonyms(){

        $entity='Entity';
        $skill='skill';
        $skill=$GLOBALS['request']->$entity->$skill;

//        $sql='select termSynonyms from Synonyms where term= financial ';

        $sql=' select * from Synonyms where term ="'. $skill. '" or termSynonyms ="' .$skill. '"';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }


    public function getMsgsNotifications(){

        $entity='Entity';

        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;

        $lastSeenMessageId='select lastSeenMessageId from jobseekers where jobseeker_id='.$js_id;
        $result=$GLOBALS['db']->db_query($lastSeenMessageId);
        $row = $GLOBALS['db']->db_assoc($result);
        $lastSeenMessageId=$row['lastSeenMessageId'];



      $sql='select * from messages,jobseekers where to_id='.$js_id.' and jobseeker_id=from_id and message_id>'.$lastSeenMessageId.' group by from_id order by message_id desc';

        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));


        $messageId='select message_id from messages order by message_id DESC limit 1 ';
        $result2=$GLOBALS['db']->db_query($messageId);
         $row = $GLOBALS['db']->db_assoc($result2);
        $messageId=$row['message_id'];

        //        $last_id=$GLOBALS['db']->db_insid();
        $updateSql= 'update jobseekers set lastSeenMessageId='.$messageId.' where jobseeker_id='.$js_id;

       $result=$GLOBALS['db']->db_query($updateSql);


    }


    public function getCommentsNotifications(){

        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $lastCommentId='select lastseenComment_id from jobseekers where jobseeker_id='.$js_id.'';
        $result=$GLOBALS['db']->db_query($lastCommentId);
        $row = $GLOBALS['db']->db_assoc($result);
        $lastCommentId=$row['lastseenComment_id'];
        $sql='select posts.id,posts.title,comments.comment_id,comments.fullname from comments,posts where posts.jobseeker_id='.$js_id.' and comments.post_id=posts.id and comments.comment_id > '.$lastCommentId.' order by posts.id desc';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        $commentId='select comment_id from comments order by comment_id DESC limit 1 ';
        $result=$GLOBALS['db']->db_query($commentId);
        $row = $GLOBALS['db']->db_assoc($result);
        $commentId=$row['comment_id'];
        $updateSql= 'update jobseekers set lastseenComment_id='.$commentId.' where jobseeker_id='.$js_id;
        $result=$GLOBALS['db']->db_query($updateSql);

        print(json_encode($total));
    }


    public function getAllNotifications(){


        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;

        $sql='select posts.id,posts.title,comments.comment_id,comments.fullname,jobseekers.pictureUrl from comments,posts,jobseekers where posts.jobseeker_id='.$js_id.' and comments.post_id=posts.id and comments.user_id=jobseekers.jobseeker_id order by posts.id desc';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }

        print(json_encode($total));


    }



    public function getRemindersHistory(){
        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $reminderDate='reminderDate';
        $reminderDate=$GLOBALS['request']->$entity->$reminderDate;

        $sql='select remainderDate,eventTitle,jobId from events where remainderDate<"'.$reminderDate. '"'.' and jobseeker_id='.$js_id;
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();

        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }


        print(json_encode($total));
    }

    public function getMsgsHistoryRequest(){
        $entity='Entity';
        $js_id='js_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $reminderDate='reminderDate';
        $reminderDate=$GLOBALS['request']->$entity->$reminderDate;

        $sql='select * from messages,jobseekers where to_id='.$js_id.' and jobseeker_id=from_id  group by from_id';
        $result=$GLOBALS['db']->db_query($sql);
        $total=array();

        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }


        print(json_encode($total));
    }




    public function getJobsHistory(){
               $entity='Entity';
                $js_id='js_id';
                $js_id=$GLOBALS['request']->$entity->$js_id;

        //        $sql='select count(*) AS "counts", joblist.jobId, notifications.content, notifications.alertDate from joblist,notifications where notifications.notiToId='.$js_id.'and notifications.notiToId=joblist.jobseekerId order by joblist.jobId DESC limit'. $countNot;
                $sql='select jobNotification.content,jobNotification.alertDate,jobNotification.jobId from jobNotification,jobseekers  where jobNotification.notiToId='.$js_id;
                $result=$GLOBALS['db']->db_query($sql);
               $total=array();
                while($row = $GLOBALS['db']->db_assoc($result)){
                        array_push($total, $row);
                    }

        print(json_encode($total));
    }





}

$GLOBALS['request']=json_decode(file_get_contents('php://input'));


$jb=new Jobseeker_Form(1,'post');
