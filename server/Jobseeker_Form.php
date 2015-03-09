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

                case 'addjobRequest':
                    $this->add_job();
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
//        $this->db_query()
//        $post=new Post();
        $entity='Entity';
        $title='title';
        $title=$GLOBALS['request']->$entity->$title;


        $body='body';
        $body=$GLOBALS['request']->$entity->$body;
        $sql='insert into post values(NULL,"'.$title.'","'.$body.'")';
        $GLOBALS['db']->db_query($sql);
        print ($title);
    }


    public function get_posts(){

        $sql='select * from post';
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


        $sql='select * from post where id='.$postId;
        $result=$GLOBALS['db']->db_query($sql);

        $row = $GLOBALS['db']->db_assoc($result);
        print(json_encode($row));

    }

    public function delete_post(){
        $postId='postId';
        $postId=$GLOBALS['request']->$postId;

        $sql='delete from post where id='.$postId;
        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode("Done"));
    }

    public function validateJobseekerRequest(){
        $entity='Entity';
        $firstName='firstName';
        $firstName=$GLOBALS['request']->$entity->$firstName;

//        $sql='delete from post where id='.$postId;
//        $result=$GLOBALS['db']->db_query($sql);

        print(json_encode($firstName));
    }



    public function add_job(){
//        $this->db_query()
//        $post=new Post();
        $entity='Entity';
        $name='name';
        $name=$GLOBALS['request']->$entity->$name;



        $sql='insert into job values(NULL, "'.$name.'")';
        $GLOBALS['db']->db_query($sql);
        print ($name);
    }





}

$GLOBALS['request']=json_decode(file_get_contents('php://input'));


$jb=new Jobseeker_Form(1,'post');
