import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import FindNodes from "./FindNodes.vue";

describe('FindNodes.vue', () =>{

    let wrapper;

    beforeEach(() =>{
        wrapper = shallowMount(FindNodes)
    })

    it('generate error message when the first line contains leading spaces', () =>{
        wrapper.vm.methodText = "    This is no leading space string"
        wrapper.vm.highestCallerCount = 0
        expect(wrapper.vm.calculateNodeLeaf()).toBe(0)
        expect(wrapper.text()).toContain("Number of node leaf: 0")
        expect(wrapper.vm.leadingSpacesErrorMsg).toContain("Please remove the leading spaces from the first line.")
    })

    it('calculate node leaf correctly for valid input', () =>{
        wrapper.vm.highestCallerCount = 0
        wrapper.vm.methodText = "AlertAPI.updateExistingAlertTimes(AlertVO, long[], String)  (com.hinext.emr.api)\n"+
        "  AlertTask.run()  (com.hinext.emr.task)\n"+
        "  EMRAdmin.runAlert(HttpServletRequest, HttpServletResponse)  (com.hinext.emr.servlet)\n"+
        "       EMRAdmin.doPost(HttpServletRequest, HttpServletResponse)  (com.hinext.emr.servlet)\n"+
        "        EMRAdmin.doGet(HttpServletRequest, HttpServletResponse)  (com.hinext.emr.servlet)"
        expect(wrapper.vm.calculateNodeLeaf()).toBe(2)
    })   

})





