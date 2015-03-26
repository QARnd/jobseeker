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
                case 'getSinglePostRequest':
                    $this->getSinglePost();
                    break;
                case 'deletePostRequest':
                    $this->delete_post();
                    break;
                case 'validateJobseekerRequest':
                    $this->validateJobseekerRequest();
                    break;

                case 'addJobRequest':
                    $this->add_job();
                    break;
                case 'sendMessageRequest':
                    $this->send_message();
                    break;
                case 'viewProfileRequest':
                    $this->viewProfile();
                    break;
            }
        }
    }


    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------

    /////
    // used by: Dispatcher($request)
    // output: return data needed to client side/ make an operation in database
    /////



    //Add Post
    public function add_post(){

        $entity='Entity';
        $title='title';
        $title=$GLOBALS['request']->$entity->$title;
        $body='body';
        $body=$GLOBALS['request']->$entity->$body;
        $jobseeker_id='jobseeker_id';
        $ $jobseeker_id=$GLOBALS['request']->$entity-> $jobseeker_id;
        $sql='insert into posts values(NULL,"'.$title.'","'.$body.'",'.$jobseeker_id.',"jkk")';
        $GLOBALS['db']->db_query($sql);
        print ($title);
    }


    public function get_posts(){

        $sql='select * from posts';
        $result=$GLOBALS['db']->db_query($sql);

        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));

    }




    public function getSinglePost(){

        $postId='id';
        $postId=$GLOBALS['request']->$postId;
        $sql='select * from posts where id='.$postId;
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
        $postId = 'id';
        $postId = $GLOBALS['request']->$postId;
        $title = 'title';
        $title = $GLOBALS['request']->$title;
        $body = 'body';
        $body = $GLOBALS['request']->$body;

        $sql = 'update posts set title= "'.$title.'",body="'.$body.'" where id='.$postId;
        $result = $GLOBALS['db']->db_query($sql);

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
        print(json_encode($js_id));
    }



    public function add_job(){
//        $this->db_query()
//        $post=new Post();
        $entity='Entity';
        $title='title';
        $title=$GLOBALS['request']->$entity->$title;

        $Body='Body';
        $Body=$GLOBALS['request']->$entity->$Body;

        $tags='tags';
        $tags=$GLOBALS['request']->$entity->$tags;


        $sql='insert into jobs values(NULL,"'.$title.'","'.$Body.'","'.$tags.'")';
        $GLOBALS['db']->db_query($sql);
        print ($title);
    }



    public function send_message(){

        $entity='Entity';
        $content='content';
        $content=$GLOBALS['request']->$entity->$content;
        $to_id='to_id';
        $to_id=$GLOBALS['request']->$entity->$to_id;
        $js_id='jobseeker_id';
        $js_id=$GLOBALS['request']->$entity->$js_id;
        $sql='insert into messages values(NULL,"'.$content.'",now(),'.$js_id.','.$to_id.')';
        $GLOBALS['db']->db_query($sql);

        print ($content);
    }

    public function viewProfile(){
        $jobSeekerId='jobSeekerId';
        $jobSeekerId=$GLOBALS['request']->$jobSeekerId;

        $sql='select * from jobseekers where id='.$jobSeekerId;
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
