/**
 Settings Backbone > View
 @class FQManagerView
 @constructor
 @return {Object} instantiated FQManagerView
 **/
define(['jquery', 'backbone', 'ScrollToPlugin', 'TweenMax'], function ($, Backbone, ScrollToPlugin, TweenMax) {

    var FQManagerView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_offsetPosition = 0;
            self.m_fqCreatorView = BB.comBroker.getService(BB.SERVICES.FQCREATORVIEW);
            self.m_selectedLine = undefined;
            self.m_selectedQueue = 1;
            $(Elements.FASTERQ_MANAGER_BACK).on('click', function () {
                self.options.stackView.selectView(Elements.FASTERQ_CREATOR_CONTAINER);
            });

            self.listenTo(self.options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e == self)
                    self._render();
            });

            self._listenContButtons();
            self._scrollTo($(Elements.FQ_LINE_QUEUE_COMPONENT + ':first-child'));
        },

        _render: function () {
            var self = this;
            self.m_selectedLine = self.m_fqCreatorView.getSelectedLine();

            for (var i = -8; i < 0; i++) {
                var val = BB.lib.padZeros(i, 3, 0);
                var snippet = '<div data-queue_id="' + i + '" class="personInLine"></div>';
                $(Elements.FQ_LINE_QUEUE_COMPONENT).append(snippet);
            }


            for (var i = 0; i < 100; i++) {
                var val = BB.lib.padZeros(i, 3, 0);
                var snippet = '<div data-queue_id="' + i + '" class="personInLine"><i style="font-size: 90px" class="fa fa-male"></i><h3 style="position: relative; left: 6px">' + val + '</h3></div>';
                $(Elements.FQ_LINE_QUEUE_COMPONENT).append(snippet);
            }
        },

        _scrollTo: function (i_element) {
            var self = this;
            var scrollXPos = $(i_element).position().left;
            console.log('current offset ' + scrollXPos);
            console.log('going to ' + $(i_element).index());
            self.m_offsetPosition = $(Elements.FQ_LINE_QUEUE_COMPONENT_CONTAINER).scrollLeft();
            scrollXPos += self.m_offsetPosition;
            var final = scrollXPos - 480;
            event.preventDefault();
            TweenLite.to(Elements.FQ_LINE_QUEUE_COMPONENT_CONTAINER, 2, {
                scrollTo: {x: final, y: 0},
                ease: Power4.easeOut
            })
            log($('#fqLineQueueComponent').width());
            log($('#fqLineQueueComponentWrap').width());
        },

        _listenContButtons: function () {
            var self = this;
            $(Elements.FQ_LINE_COMP_PREV).on('click', function () {
                if (self.m_selectedQueue == 1)
                    return;
                self.m_selectedQueue--;
                var elem = self.$('[data-queue_id="' + self.m_selectedQueue + '"]');
                self._scrollTo(elem);
            });

            $(Elements.FQ_LINE_COMP_CALL).on('click', function () {
                var value = $('#aaa').val();
                if (!$.isNumeric(value) || value < 1 || value > 99)
                    return;
                self.m_selectedQueue = value;
                var elem = self.$('[data-queue_id="' + self.m_selectedQueue + '"]');
                self._scrollTo(elem);
            });

            $(Elements.FQ_LINE_COMP_SERVICED).on('click', function () {

            });

            $(Elements.FQ_LINE_COMP_NEXT).on('click', function () {
                if (self.m_selectedQueue == 99)
                    return;
                self.m_selectedQueue++;
                var elem = self.$('[data-queue_id="' + self.m_selectedQueue + '"]');
                self._scrollTo(elem);
            });
        }

    });

    return FQManagerView;
});

