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
                case 'createAccountRequest':
                    $this->createAccount();
                    break;

            }

        }
    }

    public function add_post(){

        $entity='Entity';
        $title='title';
        $title=$GLOBALS['request']->$entity->$title;
        $body='body';
        $body=$GLOBALS['request']->$entity->$body;
        $jobseeker_id='jobseeker_id';
        $jobseeker_id=$GLOBALS['request']->$entity-> $jobseeker_id;
        $sql='insert into posts values(NULL,"'.$title.'","'.$body.'",'.$jobseeker_id.',"seen","'.date("Y-m-d H:i:s").'")';
        $GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        $newPost = array('id'=>$last_id,'title' => $title,'body' => $body,'publish_date'=>date("Y-m-d H:i:s"), 'jobseeker_id'=>$jobseeker_id,'status'=>"seen");
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
        $sql='select* from posts  where posts.id='.$postId.'';
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
        $jobDescrbtion='jobDescrbtion';
        $jobDescrbtion=$GLOBALS['request']->$entity->$jobDescrbtion;
        $jobTag='jobTag';
        $jobTag=$GLOBALS['request']->$entity-> $jobTag;
        $sql='insert into job(jobTitle,jobDescription,jobTag,publishDate,jobProvider) values("'.$jobTitle.'","'.$jobDescrbtion.'","'.$jobTag.'","'.date("Y-m-d H:i:s").'",1)';
        $GLOBALS['db']->db_query($sql);
        print ($sql);
    }

    public function get_jobs(){

        $sql='select * from job';
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
        $sql='select * from job where jobId='.$jobId;
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
            $sql='insert into jobseekers VALUES (NULL,"'.$id.'","'. $firstName.'","'. $lastName.'","'.$emailAddress.'","'.$skills.'","'. $publicProfileUrl.'","'.$pictureUrl.'","'.$education.'","'.$summary.'","'.$industry.'","'.$location.'")';

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

        $newMsg = array('content' => $content,'date' => date("Y-m-d H:i:s"), 'from_id' => $js_id, 'to_id'=>$to_id);
        print (json_encode($newMsg));
    }

    public function getMessages(){

        $entity='Entity';

        $js_id='from_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;

        $to_id='to_id';
        $to_id=$GLOBALS['request']->$entity->$to_id;

        $sql='select * from messages where (from_id='.$js_id.' and to_id='.$to_id.')or(to_id='.$js_id.' and from_id='.$to_id.')' ;
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
        $sql = 'insert into jobprovider values(NULL,"'.$name.'","'.$email.'",'.$description.','.$location.'';
        $GLOBALS['db']->db_query($sql);
        print(json_encode("done"));
    }


}

$GLOBALS['request']=json_decode(file_get_contents('php://input'));


$jb=new Jobseeker_Form(1,'post');
