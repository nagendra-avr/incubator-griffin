/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {HttpClient} from '@angular/common/http';
import {ServiceService} from '../../service/service.service';



@Component({
  selector: 'app-measure-detail',
  templateUrl: './measure-detail.component.html',
  providers:[ServiceService],
  styleUrls: ['./measure-detail.component.css']
})
export class MeasureDetailComponent implements OnInit {
  currentId:string;
  constructor(private route: ActivatedRoute,
  private router: Router,private http:HttpClient,public serviceService:ServiceService) { };
  ruleData : any;
  sourceLength : number;
  sourceDB : string;
  targetDB : string;
  sourceTable : string;
  targetTable : string;
  type:string;
  currentrule:string;

  ngOnInit() {
    this.ruleData = {
      'evaluateRule':''
    };
  	var getModelUrl;
    var getModel = this.serviceService.config.uri.getModel; 
  	this.currentId = this.route.snapshot.paramMap.get('id');
    getModelUrl = getModel+"/"+this.currentId;
    this.http.get(getModelUrl).subscribe(data=>{
      this.ruleData = data;
      this.currentrule = this.ruleData.evaluateRule.rules;
      this.ruleData.type = this.currentrule[0]["dq.type"];
      var sourcedata = this.ruleData["data.sources"][0].connectors[0].config;          
      this.sourceDB = sourcedata.database;
      this.sourceTable = sourcedata["table.name"];
      if(this.ruleData.type === "accuracy"){
        var targetdata = this.ruleData["data.sources"][1].connectors[0].config;
        this.targetDB = targetdata.database;
        this.targetTable = targetdata["table.name"];
      }else{
        this.targetDB = '';
        this.targetTable = '';
      }          
     },err => {
     	console.log('error');
      // toaster.pop('error', 'Error when geting record', response.message);
    });
  }

}
